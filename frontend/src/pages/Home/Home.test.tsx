import { io } from 'socket.io-client';
import config from '../../config';
import Home from './Home';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
const socket = io(config.SOCKET_ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

describe('pages/Home', () => {
  test('show error when no connection id provided', () => {
    render(
      <BrowserRouter>
        <Home socket={socket} />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Enter the connection ID/i);
    const chatButton = screen.getByRole('button', { name: 'Chat' });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(chatButton);
    expect(screen.getByText('Connection ID is required !')).toBeInTheDocument();
  });
});
