const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'old-index.html'));
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle location updates
  socket.on('locationUpdate', (data) => {
    io.emit('locationUpdate', { id: socket.id, latlng: data.latlng });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    io.emit('userDisconnected', { id: socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
