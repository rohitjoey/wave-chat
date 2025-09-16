import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as IOServer } from 'socket.io';

import CONFIG from './config';

const app = express();
const router = express.Router();

const httpServer = http.createServer(http);
const io = new IOServer(httpServer);

app.use(router);
app.use(cors({ origin: '*' }));

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on('join-room', ({ room }: { room: string }) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
    socket.emit('welcome-message', { message: 'Welcome to the wave chat' }); //to current socket
    socket.to(room).emit('welcome-message', { message: 'A person has joined the chat' }); //to other socket in the room
  });

  socket.on('send-message', ({ room, message }: { room: string; message: string }) => {
    io.to(room).emit('chat-message', { socketId: socket.id, message });
  });
});

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server listening on *:${CONFIG.PORT} 🚀`);
});
