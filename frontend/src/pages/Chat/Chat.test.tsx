import { io } from 'socket.io-client';
import config from '../../config';
import Chat from './Chat';

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
const socket = io(config.SOCKET_ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

describe('pages/Chat', () => {
  test('does not show list when there are no messages', () => {
    render(
      <BrowserRouter>
        <Chat socket={socket} />
      </BrowserRouter>
    );
    const list = screen.queryByRole('list');
    expect(list).toBe(null);
  });
});
