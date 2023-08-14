function getApiCall() {
  fetch("http://localhost:3000/noti").then();
}
let registration;
let applicationServerKey;

fetch('http://localhost:3000/get').then(res => res.json()).then(res => {

  // applicationServerKey = urlBase64ToUint8Array(res.key);
  applicationServerKey = urlBase64ToUint8Array(res.key);
  registerPWA();
})

function registerPWA() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Register the service worker
    navigator.serviceWorker.register('/sw.js')
      .then(function (reg) {
        console.log('Service Worker registered:', reg);

        // Get the subscription details
        registration = reg;
        registration.active.postMessage(
          "Test message sent immediately after creation",
        );
        return registration.pushManager.getSubscription();
      })
      .then(function (subscription) {
        const subscribeBtn = document.getElementById('subscribeBtn');

        // Update UI based on subscription status
        console.log("Subs")
        if (subscription) {
          subscribeBtn.textContent = 'Unsubscribe from Push Notifications';
        } else {
          subscribeBtn.textContent = 'Subscribe to Push Notifications';
        }

        // Subscribe or unsubscribe based on user interaction
        subscribeBtn.addEventListener('click', function () {
          if (subscription) {
            // Unsubscribe from push notifications
            subscription.unsubscribe()
              .then(function (successful) {
                console.log('Unsubscribed from push notifications:', successful);
                subscribeBtn.textContent = 'Subscribe to Push Notifications';
              })
              .catch(function (error) {
                console.error('Error unsubscribing from push notifications:', error);
              });
          } else {
            // Subscribe to push notifications
            subscribeToPWA();
          }
        });
      })
      .catch(function (error) {
        console.error('Service Worker registration error:', error);
      });
  }
}

function fetchServerKeyFromServer(subscription) {
  const endpoint = subscription.endpoint;
  const p256dh = arrayBufferToBase64(subscription.getKey('p256dh'));
  const auth = arrayBufferToBase64(subscription.getKey('auth'));
  fetch('http://localhost:3000/save-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ endpoint, p256dh, auth })
  }).then(res => res.json()).then(res => {
    subscribeToPWA(urlBase64ToUint8Array(res.key));
  })
}

function subscribeToPWA() {
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey
  })
    .then(function (newSubscription) {
      console.log('Subscribed to push notifications:', newSubscription);
      subscribeBtn.textContent = 'Unsubscribe from Push Notifications';

      fetchServerKeyFromServer(newSubscription);


      console.log("Sending Push...");
      fetch("http://localhost:3000/subscribe", {
        method: "POST",
        body: JSON.stringify(newSubscription),
        headers: {
          "content-type": "application/json"
        }
      });
      console.log("Push Sent...");
    })
    .catch(function (error) {
      console.error('Error subscribing to push notifications:', error);
    });
}


function arrayBufferToBase64(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let binaryString = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }
  return btoa(binaryString);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// const subscription = await register.pushManager.subscribe({
//   userVisibleOnly: true,
//   applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
// });