// Warmth slider — tints the palette from warm (left) to cool (right).
// Works in both light and dark mode by interpolating each theme's neutral
// base toward a warm or cool endpoint.
(function() {
  const slider = document.getElementById('warmthSlider');
  const html = document.documentElement;

  if (!slider) return;

  // Endpoint palettes per theme. Index 0 = fully warm, 1 = neutral (current
  // token values), 2 = fully cool. Everything between is interpolated.
  const PALETTES = {
    light: {
      warm:    { bgPrimary: '#faf3e8', bgSecondary: '#f3ead9', border: '#e8dcc6' },
      neutral: { bgPrimary: '#ffffff', bgSecondary: '#fafafa', border: '#f0f0f0' },
      cool:    { bgPrimary: '#f2f6fb', bgSecondary: '#e9eff7', border: '#dae3ef' }
    },
    dark: {
      warm:    { bgPrimary: '#241f19', bgSecondary: '#2e2820', border: '#3d362c' },
      neutral: { bgPrimary: '#1c1a18', bgSecondary: '#262320', border: '#35312d' },
      cool:    { bgPrimary: '#16191f', bgSecondary: '#1f242c', border: '#2d333d' }
    }
  };

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  }

  function mix(hexA, hexB, t) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    return rgbToHex(a.map((v, i) => v + (b[i] - v) * t));
  }

  // value: -100 (warm) .. 0 (neutral) .. 100 (cool)
  function apply(value) {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const p = PALETTES[theme];
    const t = Math.abs(value) / 100;
    const target = value < 0 ? p.warm : p.cool;

    html.style.setProperty('--bg-primary', mix(p.neutral.bgPrimary, target.bgPrimary, t));
    html.style.setProperty('--bg-secondary', mix(p.neutral.bgSecondary, target.bgSecondary, t));
    html.style.setProperty('--border-color', mix(p.neutral.border, target.border, t));
  }

  // Restore saved warmth, then apply.
  let saved = parseInt(localStorage.getItem('warmth'), 10);
  if (isNaN(saved)) saved = 0;
  slider.value = saved;
  apply(saved);

  slider.addEventListener('input', function() {
    const value = parseInt(this.value, 10);
    localStorage.setItem('warmth', value);
    apply(value);
  });

  // Re-apply when the light/dark toggle switches themes, so the warmth
  // carries over to the other theme's palette.
  window.addEventListener('themechange', function() {
    apply(parseInt(slider.value, 10));
  });
})();
