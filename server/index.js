const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('Connected client on port %s.', port);
  socket.on('message', (m) => {
    console.log('[server](message): %s', JSON.stringify(m));
    io.emit('message', m);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`))
