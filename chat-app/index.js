

const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

// Store connected clients
const clients = new Set();

// Handle incoming connections
wss.on('connection', function (ws) {
  console.log('A client connected to the WebSocket server');

  // Add the client to the set of connected clients
  clients.add(ws);

  // Listen for messages from the client
  ws.on('message', function (message) {
    console.log('Received message from client:', message);

    // Forward the message to all other connected clients
    clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log("send")
        client.send(message);
      }
    });
  });

  // Handle disconnections
  ws.on('close', function () {
    console.log('A client disconnected from the WebSocket server');
    
    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});
