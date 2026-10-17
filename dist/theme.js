// Apply before the stylesheet loads so a saved dark theme does not flash light.
(() => {
  const key = 'rhetoric-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  let explicit = preference === 'dark' || preference === 'light';
  function apply(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1c1e1b' : '#f6f3ec');
    document.querySelector('[data-action="toggle-theme"]')?.setAttribute('aria-pressed', String(dark));
  }
  apply(explicit ? preference === 'dark' : system.matches);
  system.addEventListener('change', event => { if (!explicit) apply(event.matches); });
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-action="toggle-theme"]')) return;
    const dark = document.documentElement.dataset.theme !== 'dark';
    explicit = true;
    apply(dark);
    try { localStorage.setItem(key, dark ? 'dark' : 'light'); }
    catch {
      const notice = document.querySelector('#notice');
      if (notice) notice.textContent = 'Theme changed for this visit. Your browser could not remember the preference.';
    }
  });
})();
