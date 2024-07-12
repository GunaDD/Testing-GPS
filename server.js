const io = socketIo(server);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    socket.on('locationUpdate', (data) => {
        io.emit('locationUpdate', { id: socket.id, latlng: data.latlng });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

