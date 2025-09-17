import { CopyOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Layout, List, Typography } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import NavBar from '../../components/Navbar';

interface Message {
  socketId: string;
  message: string;
}

export default function Chat({ socket }: { socket: Socket }) {
  const { connectionId } = useParams<{ connectionId: string }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [copyStatus, setCopyStatus] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('join-room', {
      room: connectionId
    });

    socket.on('system-message', (data: { message: string }) => {
      setWelcomeMessage(data.message);
      setTimeout(() => setWelcomeMessage(''), 2000);
    });

    const handleMessage = (data: { socketId: string; message: string }) => {
      setMessages((prevItems) => [...(prevItems as Message[]), data]);
    };

    socket.on('chat-message', handleMessage);
    return () => {
      socket.off('chat-message', handleMessage);
    };
  }, []);

  const handleNewMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    if (!text.trim()) {
      return;
    }
    if (e.key === 'Enter') {
      console.log('Enter key pressed!', e.currentTarget.value);

      socket.emit('send-message', { room: connectionId, message: text });
      setMessageInput('');
    }
  };

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(connectionId as string);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus(''), 2000);
  };
  return (
    <>
      <NavBar />

      <Flex vertical align="center" style={{ marginTop: '0px' }}>
        <Typography.Text style={{ fontFamily: 'cursive' }}>
          Your connection id is <span style={{ fontSize: '30px' }}>{connectionId}</span>
          <Button style={{ border: 'none', padding: '0' }} onClick={handleCopy}>
            <CopyOutlined />
            {copyStatus && <p>{copyStatus}</p>}
          </Button>
        </Typography.Text>
        <span style={{ color: '#d63e66', fontFamily: 'cursive' }}>{welcomeMessage}</span>
      </Flex>
      <Layout
        style={{
          height: '74vh',
          margin: 'auto',
          width: '100%',
          maxWidth: '700px',
          borderRadius: '18px',
          overflowY: 'auto'
        }}
      >
        <Content style={{ padding: '12px 18px 20px', overflowY: 'auto' }} ref={containerRef}>
          {messages.length > 0 ? (
            <List
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    borderBottomColor: 'transparent',
                    display: 'flex',
                    justifyContent: item.socketId == socket.id ? 'flex-end' : 'flex-start',
                    padding: '8px 0px 8px 0px'
                  }}
                >
                  <Typography.Text
                    style={{
                      background: item.socketId == socket.id ? '#dc7490ff' : 'white',
                      padding: '9px',
                      borderRadius: '18px',
                      fontFamily: 'cursive',
                      maxWidth: '400px'
                    }}
                  >
                    {item.message}
                  </Typography.Text>
                </List.Item>
              )}
            />
          ) : null}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Input
            style={{ width: '100%' }}
            placeholder="Aa"
            onPressEnter={handleNewMessage}
            value={messageInput}
            onChange={handleMessageInputChange}
          />
        </Footer>
      </Layout>
    </>
  );
}
