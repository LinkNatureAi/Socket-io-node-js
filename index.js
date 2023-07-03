// Import dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create the express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up a route for serving the client-side HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Set up socket.io event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log('Server listening on port ' + port);
});
