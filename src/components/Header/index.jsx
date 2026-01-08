import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layout,
  Menu,
  Input,
  Button,
  Dropdown,
  Avatar,
  Space,
  Badge,
  message
} from 'antd';
import {
  HomeOutlined,
  EditOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  BellOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import './index.css';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/?search=${encodeURIComponent(value)}`);
      message.info(`搜索: ${value}`);
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人中心',
      icon: <UserOutlined />
    },
    {
      key: 'write',
      label: '写文章',
      icon: <EditOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true
    }
  ];

  const navItems = [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
      icon: <HomeOutlined />
    },
    {
      key: 'archive',
      label: <Link to="/archive">归档</Link>,
      icon: <UnorderedListOutlined />
    },
    {
      key: 'write',
      label: <Link to="/write">写文章</Link>,
      icon: <EditOutlined />
    },
    {
      key: 'about',
      label: <Link to="/about">关于</Link>,
      icon: <UserOutlined />
    }
  ];

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        message.info('跳转到个人中心');
        break;
      case 'write':
        navigate('/write');
        break;
      case 'logout':
        setIsLoggedIn(false);
        setCurrentUser(null);
        message.success('已退出登录');
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser({
      name: '当前用户',
      avatar: 'https://picsum.photos/100/100?random=6'
    });
    message.success('登录成功');
  };

  return (
    <AntHeader className="site-header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">MY-BLOG</Link>
        </div>

        <div className="search-bar">
          <Search
            placeholder="搜索文章..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
          />
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={navItems}
          className="nav-menu"
        />

        <Space size="large" className="header-actions">
          <Badge count={3} size="small">
            <BellOutlined className="notification-icon" />
          </Badge>

          {isLoggedIn ? (
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
            >
              <Avatar
                size="large"
                src={currentUser?.avatar}
                className="user-avatar"
              />
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleLogin}
            >
              登录/注册
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;