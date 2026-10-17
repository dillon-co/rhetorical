if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'});
    } catch {
      const notice = document.querySelector('#notice');
      if (notice) notice.textContent = 'Offline setup could not finish. You can still practice online; reopen while connected to try again.';
    }
  });
}
