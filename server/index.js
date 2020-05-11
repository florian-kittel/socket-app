const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;
const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server, {
  path: '/api/mysocket'
});

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('Connected client on port %s with ID %s', port, socket.id);

  socket.send(socket.id);

  socket.on('message', (m) => {
    // console.log('[server][%s](message): %s', socket.id, JSON.stringify(m));
    io.in(m.room || 'default').emit('message', m);
  });

  socket.on('room', (newRoom) => {
    let rooms = io.sockets.adapter.sids[socket.id];

    for (var room in rooms) {
      if (room !== socket.id) {
        socket.leave(room);
        console.log(socket.id, 'leaves room', room);
      }
    }

    console.log(socket.id, 'joins room', newRoom);
    socket.join(newRoom);
  });

  socket.on('reload', (room) => {
    socket.to(room || 'default').emit('reload', room);
    // Refresh all other and ignore rooms
    // socket.broadcast.emit('reload', m);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
