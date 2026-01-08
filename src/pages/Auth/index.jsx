import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  message,
  Typography,
  Space,
  Avatar
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
  GoogleOutlined
} from '@ant-design/icons';
import './index.css';

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    console.log('Login values:', values);
    
    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      message.success('登录成功');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({
        username: values.username,
        email: 'user@example.com'
      }));
      navigate('/');
    }, 1000);
  };

  const handleRegister = async (values) => {
    setLoading(true);
    console.log('Register values:', values);
    
    // 模拟注册请求
    setTimeout(() => {
      setLoading(false);
      message.success('注册成功');
      setActiveTab('login');
      registerForm.resetFields();
    }, 1000);
  };

  const handleOAuthLogin = (provider) => {
    message.info(`正在通过 ${provider} 登录...`);
    // 这里应该实现OAuth登录逻辑
  };

  const forgotPassword = () => {
    message.info('请联系管理员重置密码');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <Card className="auth-card">
            <div className="auth-header">
              <Title level={2} className="auth-title">
                {activeTab === 'login' ? '欢迎回来' : '创建账户'}
              </Title>
              <Text type="secondary">
                {activeTab === 'login' 
                  ? '登录你的账户继续使用' 
                  : '注册新账户开始创作'}
              </Text>
            </div>

            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              centered
              className="auth-tabs"
            >
              <TabPane tab="登录" key="login">
                <Form
                  form={loginForm}
                  layout="vertical"
                  onFinish={handleLogin}
                  className="auth-form"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: '请输入用户名或邮箱' },
                      { min: 3, message: '用户名至少3个字符' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名或邮箱"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6个字符' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="form-options">
                      <Checkbox>记住我</Checkbox>
                      <Button type="link" onClick={forgotPassword} className="forgot-password">
                        忘记密码?
                      </Button>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      block
                    >
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="注册" key="register">
                <Form
                  form={registerForm}
                  layout="vertical"
                  onFinish={handleRegister}
                  className="auth-form"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: '请输入用户名' },
                      { min: 3, message: '用户名至少3个字符' },
                      { max: 20, message: '用户名最多20个字符' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="邮箱"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6个字符' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: '请确认密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="确认密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议')),
                      },
                    ]}
                  >
                    <Checkbox>
                      我已阅读并同意 <Link>用户协议</Link> 和 <Link>隐私政策</Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      block
                    >
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>

            <Divider>或使用以下方式</Divider>

            <div className="oauth-buttons">
              <Space wrap size="large">
                <Button 
                  icon={<GithubOutlined />} 
                  size="large"
                  onClick={() => handleOAuthLogin('GitHub')}
                  className="oauth-btn github"
                >
                  GitHub
                </Button>
                <Button 
                  icon={<WechatOutlined />} 
                  size="large"
                  onClick={() => handleOAuthLogin('微信')}
                  className="oauth-btn wechat"
                >
                  微信
                </Button>
                <Button 
                  icon={<QqOutlined />} 
                  size="large"
                  onClick={() => handleOAuthLogin('QQ')}
                  className="oauth-btn qq"
                >
                  QQ
                </Button>
                <Button 
                  icon={<GoogleOutlined />} 
                  size="large"
                  onClick={() => handleOAuthLogin('Google')}
                  className="oauth-btn google"
                >
                  Google
                </Button>
              </Space>
            </div>

            <div className="auth-footer">
              {activeTab === 'login' ? (
                <Text>
                  还没有账户？{' '}
                  <Link onClick={() => setActiveTab('register')}>立即注册</Link>
                </Text>
              ) : (
                <Text>
                  已有账户？{' '}
                  <Link onClick={() => setActiveTab('login')}>立即登录</Link>
                </Text>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;