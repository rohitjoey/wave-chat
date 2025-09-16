import type { GetProps } from 'antd';
import { Button, Flex, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Socket } from 'socket.io-client';
import NavBar from '../../components/Navbar';
const { Text } = Typography;
const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

export default function Home({ socket }: { socket: Socket }) {
  const navigate = useNavigate();
  const [connectionIdError, setConnectionIdError] = useState<string>();
  const onChatButtonHandler: SearchProps['onSearch'] = (value) => {
    if (!value.trim()) {
      setConnectionIdError('Connection ID is required !');
      return;
    }
    setConnectionIdError('');
    startChatHandler(value);
  };

  const startChatHandler = (id: string) => {
    console.log(id);
    navigate(`/chat/${id}`);
  };

  const createConnectionIDButtonHandler = () => {
    const connectionId = (Math.random() + 1).toString(36).slice(2, 7);
    startChatHandler(connectionId);
  };
  console.log(socket);

  return (
    <>
      <NavBar />
      <Flex vertical gap="middle" style={{ margin: 'auto', width: '100%', maxWidth: '360px', marginTop: '140px' }}>
        <Search
          placeholder="Enter the connection ID"
          required
          style={{ fontFamily: 'cursive' }}
          onChange={() => setConnectionIdError('')}
          enterButton={
            <Button
              size="large"
              type="primary"
              style={{
                margin: 'auto',
                width: '100%',
                fontFamily: 'cursive',
                background: '#d4728cff',
                color: 'white'
              }}
            >
              Chat
            </Button>
          }
          size="large"
          onSearch={onChatButtonHandler}
        />
        <span style={{ color: '#e50c46ff', fontFamily: 'cursive' }}>{connectionIdError}</span>
        <Text style={{ margin: 'auto' }} disabled>
          OR
        </Text>
        <Button
          shape="round"
          size="large"
          type="primary"
          style={{
            margin: 'auto',
            width: '100%',
            fontFamily: 'cursive',
            background: '#d4728cff',
            color: 'white'
          }}
          onClick={() => createConnectionIDButtonHandler()}
        >
          Create your connection ID and Chat
        </Button>
      </Flex>
    </>
  );
}
