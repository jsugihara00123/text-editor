const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//complete

window.addEventListener('beforeinstallprompt', (event) => {
  
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false)
});

// TODO: Implement a click event handler on the `butInstall` element
//complete

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;


  butInstall.classList.toggle("hidden", true);

});


// TODO: Add an handler for the `appinstalled` event
//complete
window.addEventListener('appinstalled', (event) => {


window.deferredPrompt = null;

});
