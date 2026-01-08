// src/pages/NotFound/index.jsx
import React from 'react';
import { Layout, Result, Button } from 'antd';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import { Link } from 'react-router-dom';
import './index.css';

const { Content } = Layout;

const NotFound = ({ loggedInUser, onLogout }) => {
    return (
        <Layout className="blog-layout">
            <AppHeader loggedInUser={loggedInUser} onLogout={onLogout} />
            <Content className="blog-content notfound-content">
                <Result
                    status="404"
                    title="404"
                    subTitle="抱歉，您访问的页面不存在。"
                    extra={
                        <Link to="/">
                            <Button type="primary">返回首页</Button>
                        </Link>
                    }
                />
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default NotFound;
