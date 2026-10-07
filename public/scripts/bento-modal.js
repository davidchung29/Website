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
  const authorsEl = document.getElementById('bentoAuthors');

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
    box.appendChild(shell);
    return box;
  }

  // A framed web page or PDF, filling the tile and scrolling internally.
  function buildFrame(src, label, kind) {
    const shell = el('div', 'bento-doc');

    // Browsers without a built-in PDF viewer render an empty frame, so offer a
    // link rather than a blank panel.
    if (kind === 'pdf' && navigator.pdfViewerEnabled === false) {
      const fallback = el('a', 'bento-doc-fallback');
      fallback.href = src;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.innerHTML = '<span>Open the paper</span>' + EXTERNAL_ICON;
      shell.appendChild(fallback);
      return shell;
    }

    const frame = document.createElement('iframe');
    frame.src = src;
    frame.title = label + ' ' + kind;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    shell.appendChild(frame);
    return shell;
  }

  // Pre-rendered page images in a scroller we own. No iframe means no
  // cross-origin boundary: scrolling scrolls the paper, clicks land normally,
  // and paging only happens once the reader reaches an end.
  function buildPaper(media, label) {
    const shell = el('div', 'bento-paper');

    for (let i = 1; i <= media.pages; i++) {
      const img = document.createElement('img');
      img.className = 'bento-paper-page';
      img.src = media.path + String(i).padStart(2, '0') + '.png';
      img.alt = label + ' paper, page ' + i + ' of ' + media.pages;
      // Only the first page blocks paint; the rest stream in as needed
      img.loading = i === 1 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.width = 850;
      img.height = 1100;
      shell.appendChild(img);
    }

    if (media.href) {
      const link = el('a', 'bento-paper-link');
      link.href = media.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = '<span>Open on arXiv</span>' + EXTERNAL_ICON;
      shell.appendChild(link);
    }

    return shell;
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
    } else if (media && media.type === 'paper') {
      slide.classList.add('bento-slide--paper');
      slide.appendChild(buildPaper(media, label));
    } else if (media && (media.type === 'page' || media.type === 'pdf')) {
      slide.classList.add('bento-slide--doc');
      slide.appendChild(buildFrame(media.src, label, media.type));
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

  }

  function populate(item) {
    mediaEl.innerHTML = '';
    copyEl.innerHTML = '';
    pagerEl.innerHTML = '';

    titleEl.textContent = item.dataset.modalOrg || '';
    const role = item.dataset.modalRole || '';
    const date = item.dataset.modalDate || '';
    subtitleEl.textContent = [role, date].filter(Boolean).join(' · ');

    // Author byline: linked where a profile exists, bold and unlinked where not
    authorsEl.innerHTML = '';
    let authors = [];
    try {
      authors = JSON.parse(item.dataset.modalAuthors || '[]');
    } catch (err) {
      authors = [];
    }

    authors.forEach(function(author, i) {
      if (i > 0) authorsEl.appendChild(document.createTextNode(', '));

      if (author.url) {
        const a = el('a', 'bento-author');
        a.href = author.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = author.name;
        authorsEl.appendChild(a);
      } else {
        const strong = el('strong', 'bento-author bento-author--self');
        strong.textContent = author.name;
        authorsEl.appendChild(strong);
      }
    });

    authorsEl.hidden = authors.length === 0;

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
      dot.setAttribute('aria-label', 'Next view');
      if (i === 0) dot.classList.add('is-active');

      // Dots advance like the pill rather than targeting their own view, so
      // clicking anywhere on the control moves to the next page.
      dot.addEventListener('click', function(e) {
        e.stopPropagation();
        step(1);
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

  // Clicking the pill itself advances a view and wraps at the end. Dots stop
  // propagation, so this only fires on the capsule around them.
  pagerEl.addEventListener('click', function(e) {
    e.stopPropagation();
    step(1);
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
    const scroller = e.target.closest &&
      e.target.closest('.bento-slide--tweet, .bento-slide--paper');
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
