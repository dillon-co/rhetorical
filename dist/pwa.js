if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'});
      const report = () => {
        const notice = document.querySelector('#notice');
        if (!notice) return;
        if (registration.waiting) notice.textContent = 'An update is ready. Close all Rhetoric windows and reopen to use it. Your saved drafts stay on this device.';
      };
      report();
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed') report();
        });
      });
    } catch {
      const notice = document.querySelector('#notice');
      if (notice) notice.textContent = 'Offline setup could not finish. You can still practice online; reopen while connected to try again.';
    }
  });
}
