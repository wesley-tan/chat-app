const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for chat messages
  socket.on('chat message', (data) => {
    // Log the message and username to the server console
    console.log('message:', data.message, 'from:', data.username);
    
    // Broadcast the message and username to all connected clients
    io.emit('chat message', data);
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
