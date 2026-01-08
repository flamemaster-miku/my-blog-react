import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';

// 导入组件
import Header from './components/Header';
import Footer from './components/Footer';

// 导入页面
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Archive from './pages/Archive';
import WritePost from './pages/WritePost';
import Auth from './pages/Auth';
import About from './pages/About';
import NotFound from './pages/NotFound';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout className="layout">
          <Header />
          <Content className="blog-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/edit/:id" element={<WritePost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;