const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const server = http.createServer(app);
const io = socketIO(server);

// Define the port
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle chat messages
    socket.on('chatMessage', (message) => {
      console.log('Message received:', message);
      io.emit('chatMessage', message);
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
