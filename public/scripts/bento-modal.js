// Bento modal: opens from experience rows flagged with data-modal-org.
// The org header is persistent; scrolling crossfades the media and project copy.
(function() {
  const overlay = document.getElementById('bentoOverlay');
  if (!overlay) return;

  const modal = overlay.querySelector('.bento-modal');
  const closeBtn = document.getElementById('bentoClose');
  const mediaEl = document.getElementById('bentoMedia');
  const copyEl = document.getElementById('bentoCopy');
  const pagerEl = document.getElementById('bentoPager');
  const titleEl = document.getElementById('bentoTitle');
  const subtitleEl = document.getElementById('bentoSubtitle');
  const linksEl = document.getElementById('bentoLinks');

  const EXTERNAL_ICON =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>' +
    '<polyline points="15 3 21 3 21 9"></polyline>' +
    '<line x1="10" y1="14" x2="21" y2="3"></line></svg>';

  let lastFocused = null;
  let index = 0;
  let count = 0;
  let locked = false;

  function el(tag, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  // X's widget script is loaded once, lazily, and reused across opens.
  let twitterPromise = null;
  function loadTwitter() {
    if (window.twttr && window.twttr.widgets) return Promise.resolve(window.twttr);
    if (twitterPromise) return twitterPromise;

    twitterPromise = new Promise(function(resolve, reject) {
      const s = document.createElement('script');
      s.src = 'https://platform.twitter.com/widgets.js';
      s.async = true;
      s.onload = function() { resolve(window.twttr); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return twitterPromise;
  }

  // A wheel over a cross-origin iframe is delivered to THAT document, so no
  // listener here ever sees it. The browser's pass-through only helps when an
  // ancestor is actually scrollable — this modal pages via a JS listener and
  // has no scroll container, so the event simply dies.
  //
  // Making the iframe a non-hit-target keeps the wheel on our side. A press
  // hands pointer events back so the player stays fully usable, and leaving the
  // embed takes them away again.
  function addShield(container) {
    const frame = container.querySelector('iframe');
    if (!frame) return null;

    frame.classList.add('bento-embed-frame');

    // YouTube accepts playback commands over postMessage, so gestures can be
    // forwarded as commands and the frame never needs pointer events at all.
    if (/youtube\.com\/embed/.test(frame.src)) {
      let playing = /[?&]autoplay=1/.test(frame.src);
      let muted = /[?&]mute=1/.test(frame.src);
      let time = 0;

      function send(func, args) {
        frame.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args || []
        }), '*');
      }

      // The player reports its position back over the same channel, so seeking
      // can be relative rather than guesswork.
      window.addEventListener('message', function(e) {
        if (!/youtube\.com$/.test(new URL(e.origin).hostname)) return;
        try {
          const data = JSON.parse(e.data);
          if (data.info && typeof data.info.currentTime === 'number') {
            time = data.info.currentTime;
          }
        } catch (err) {
          /* not a player message */
        }
      });

      // Ask the player to start reporting state
      frame.addEventListener('load', function() {
        send('addEventListener', ['onStateChange']);
        frame.contentWindow.postMessage(
          JSON.stringify({ event: 'listening' }), '*');
      });

      container.addEventListener('click', function() {
        playing = !playing;
        send(playing ? 'playVideo' : 'pauseVideo');
      });

      // Double-click toggles sound, the usual shortcut being unavailable
      container.addEventListener('dblclick', function() {
        muted = !muted;
        send(muted ? 'mute' : 'unMute');
      });

      // Arrow keys scrub, as they would in the native player
      container.setAttribute('tabindex', '0');
      container.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopPropagation();
          send('seekTo', [time + 5, true]);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopPropagation();
          send('seekTo', [Math.max(0, time - 5), true]);
        } else if (e.key === 'm' || e.key === 'M') {
          muted = !muted;
          send(muted ? 'mute' : 'unMute');
        } else if (e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          playing = !playing;
          send(playing ? 'playVideo' : 'pauseVideo');
        }
      });

      container.style.cursor = 'pointer';
      return frame;
    }

    // Embeds without such an API arm on press and release when the pointer
    // leaves, so the first press is spent handing control over.
    container.addEventListener('mousedown', function() {
      frame.classList.add('is-live');
    });

    container.addEventListener('mouseleave', function() {
      frame.classList.remove('is-live');
    });

    return frame;
  }

  function buildYouTube(src, label) {
    const box = el('div', 'bento-video');
    const shell = el('div', 'bento-video-frame');
    const clip = el('div', 'bento-video-clip');
    const frame = document.createElement('iframe');
    frame.src = src;
    frame.title = label + ' video';
    frame.allow =
      'autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    frame.allowFullscreen = true;
    clip.appendChild(frame);
    shell.appendChild(clip);
    addShield(shell);
    box.appendChild(shell);
    return box;
  }

  function buildTweet(url) {
    const holder = el('div', 'bento-tweet');



    // Fallback renders immediately and is swapped out once the widget mounts,
    // so a blocked or slow widgets.js still leaves something usable.
    const fallback = el('a', 'bento-tweet-fallback');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.innerHTML = '<span>View post on X</span>' + EXTERNAL_ICON;
    holder.appendChild(fallback);

    const id = (url.match(/status\/(\d+)/) || [])[1];
    if (!id) return holder;

    loadTwitter().then(function(twttr) {
      return twttr.widgets.createTweet(id, holder, {
        // Always dark — the embed sits on the black media tile, not the page
        theme: 'dark',
        dnt: true,
        conversation: 'none',
        align: 'center',
        // X clamps this to its own 250–550 range
        width: 400
      });
    }).then(function(node) {
      if (node && fallback.parentNode === holder) holder.removeChild(fallback);
      // The embed's iframe only exists once the widget has mounted
      addShield(holder);
    }).catch(function() {
      /* keep the fallback link */
    });

    return holder;
  }

  function buildMedia(media, label) {
    const slide = el('div', 'bento-slide');
    if (media && media.type === 'youtube') {
      slide.appendChild(buildYouTube(media.src, label));
    } else if (media && media.type === 'tweet') {
      slide.classList.add('bento-slide--tweet');
      slide.appendChild(buildTweet(media.src));
    }
    return slide;
  }

  function buildCopy(view) {
    const slide = el('div', 'bento-slide');
    const project = el('div', 'bento-project');

    const heading = el('h3', 'bento-project-heading');
    heading.textContent = view.heading || '';
    project.appendChild(heading);

    if (view.description) {
      const desc = el('p', 'bento-project-desc');
      desc.textContent = view.description;
      project.appendChild(desc);
    }

    slide.appendChild(project);
    return slide;
  }

  // X renders its player in a cross-origin iframe, so it can only be started
  // through the widget's own postMessage API — not by clicking into it.
  function playTweetVideo(slide) {
    const frame = slide.querySelector('iframe');
    if (!frame || !frame.contentWindow) return;
    try {
      frame.contentWindow.postMessage(
        JSON.stringify({ method: 'play' }),
        'https://twitter.com'
      );
      frame.contentWindow.postMessage(
        JSON.stringify({ method: 'play' }),
        'https://platform.twitter.com'
      );
    } catch (err) {
      /* embed declined; the viewer can still press play */
    }
  }

  function show(next) {
    if (next < 0 || next >= count || next === index) return;
    index = next;

    [mediaEl, copyEl].forEach(function(host) {
      host.querySelectorAll('.bento-slide').forEach(function(slide, i) {
        slide.classList.toggle('is-active', i === index);
      });
    });

    pagerEl.querySelectorAll('.bento-dot').forEach(function(dot, i) {
      dot.classList.toggle('is-active', i === index);
    });

    const active = mediaEl.querySelectorAll('.bento-slide')[index];
    if (active && active.classList.contains('bento-slide--tweet')) {
      // Wait out the crossfade so the player is visible when it starts
      setTimeout(function() { playTweetVideo(active); }, 800);
    }
  }

  function populate(item) {
    mediaEl.innerHTML = '';
    copyEl.innerHTML = '';
    pagerEl.innerHTML = '';

    titleEl.textContent = item.dataset.modalOrg || '';
    const role = item.dataset.modalRole || '';
    const date = item.dataset.modalDate || '';
    subtitleEl.textContent = [role, date].filter(Boolean).join(' · ');

    linksEl.innerHTML = '';
    let links = [];
    try {
      links = JSON.parse(item.dataset.modalLinks || '[]');
    } catch (err) {
      links = [];
    }
    links.forEach(function(link) {
      const a = el('a', 'bento-link');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = '<span>' + link.text + '</span>' + EXTERNAL_ICON;
      linksEl.appendChild(a);
    });

    let views = [];
    try {
      views = JSON.parse(item.dataset.modalViews || '[]');
    } catch (err) {
      views = [];
    }

    const label = item.dataset.modalOrg || '';
    count = views.length;
    index = 0;

    views.forEach(function(view, i) {
      const media = buildMedia(view.media, label);
      const copy = buildCopy(view);
      if (i === 0) {
        media.classList.add('is-active');
        copy.classList.add('is-active');
      }
      mediaEl.appendChild(media);
      copyEl.appendChild(copy);

      const dot = el('button', 'bento-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to view ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');

      dot.addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(i);
      });

      pagerEl.appendChild(dot);
    });

    pagerEl.hidden = count < 2;
  }

  function goTo(next) {
    if (locked) return;
    if (next < 0 || next >= count || next === index) return;

    locked = true;
    show(next);
    // Matches the crossfade duration so one gesture advances one view
    setTimeout(function() { locked = false; }, 800);
  }

  // Scrolling wraps: past the last view returns to the first, and vice versa.
  function step(delta) {
    if (!count) return;
    goTo(((index + delta) % count + count) % count);
  }

  function open(item) {
    lastFocused = document.activeElement;
    populate(item);
    overlay.hidden = false;

    // Force reflow so the opacity/scale transition runs from its start value
    overlay.offsetHeight;

    overlay.classList.add('open');
    document.body.classList.add('bento-open');
    // Focus the dialog itself, not the close button: focusing a button draws a
    // focus ring even when opened by mouse. Escape and the arrow keys are bound
    // at the document level, so keyboard control still works from here.
    modal.focus();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('bento-open');

    // Must outlast the sheet's slide-down, or it vanishes mid-flight
    setTimeout(function() {
      if (!overlay.classList.contains('open')) {
        overlay.hidden = true;
        // Drop the iframes so video/audio stops rather than playing on unseen
        mediaEl.innerHTML = '';
        copyEl.innerHTML = '';
      }
    }, 550);

    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.modal-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      open(item);
    });
  });

  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', function(e) {
    if (!modal.contains(e.target)) close();
  });

  // Wheel advances views. Bound to the window because a cross-origin embed
  // swallows the event before it reaches the modal — with the cursor over the
  // tweet, a modal-scoped listener never fires at all.
  window.addEventListener('wheel', function(e) {
    if (overlay.hidden || count < 2) return;
    if (Math.abs(e.deltaY) < 12) return;

    // Defer to a slide that still has room to scroll in this direction
    const scroller = e.target.closest && e.target.closest('.bento-slide--tweet');
    if (scroller && scroller.scrollHeight > scroller.clientHeight + 1) {
      const atTop = scroller.scrollTop <= 0;
      const atEnd =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
      const wantsDown = e.deltaY > 0;
      if ((wantsDown && !atEnd) || (!wantsDown && !atTop)) return;
    }

    if (e.cancelable) e.preventDefault();
    step(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  let touchStartY = null;
  modal.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener('touchend', function(e) {
    if (touchStartY === null) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
    touchStartY = null;
  }, { passive: true });

  document.addEventListener('keydown', function(e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      step(-1);
    }
  });
})();
