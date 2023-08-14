self.addEventListener('push', function (event) {
    const data = event.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Notified by Traversy Media!",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('/open-specific-page')
    );
  });


  self.addEventListener("message", (event) => {
    console.log(`Message received: ${event.data}`);
  });



self.addEventListener("fetch", (event) => {
    event.waitUntil(
      (async () => {
        // Exit early if we don't have access to the client.
        // Eg, if it's cross-origin.
        if (!event.clientId) return;
  
        // Get the client.
        const client = await clients.get(event.clientId);
        // Exit early if we don't get the client.
        // Eg, if it closed.
        if (!client) return;
  
        // Send a message to the client.
        client.postMessage({
          msg: "Hey I just got a fetch from you!",
          url: event.request.url,
        });
      })(),
    );
  });