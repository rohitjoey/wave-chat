import { WechatOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router';

export default function NavBar() {
  return (
    <Flex style={{ marginLeft: '40px' }}>
      <Link to="/">
        <Flex gap="middle">
          <WechatOutlined style={{ fontSize: '40px', color: '#d4728cff' }} />
          <Title style={{ color: '#d63e66', fontFamily: 'cursive' }}>Wave Chat</Title>
        </Flex>
      </Link>
    </Flex>
  );
}
