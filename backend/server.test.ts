import { createServer } from 'node:http';
import { AddressInfo } from 'node:net';
import { io as ioc, Socket as ClientSocket } from 'socket.io-client';
import { Server, Socket as ServerSocket } from 'socket.io';

describe('socket server test', () => {
  let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const address = httpServer.address() as AddressInfo;
      const port = address.port;
      clientSocket = ioc(`http://localhost:${port}`);
      io.on('connection', (socket: ServerSocket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('should respond to "send-message" event', (done) => {
    serverSocket.on('send-message', (data) => {
      expect(data.message).toBe('hello server');
      serverSocket.emit('chat-message', { socketId: 'socketId', message: 'Hello client' });
      done();
    });

    clientSocket.emit('send-message', { room: '123', message: 'hello server' });

    clientSocket.on('chat-message', (reply) => {
      expect(reply.message).toBe('hello client');
      done();
    });
  });
});
