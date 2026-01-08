import React from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Divider,
  List,
  Tag,
  Button,
  Space,
  Statistic
} from 'antd';
import {
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  GithubOutlined,
  ZhihuOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { mockPosts, mockUsers } from '../../api/mockData';
import './index.css';

const { Title, Paragraph } = Typography;
const { Countdown } = Statistic;

const About = () => {
  const blogStats = {
    totalPosts: mockPosts.length,
    totalAuthors: mockUsers.length,
    totalViews: mockPosts.reduce((sum, post) => sum + post.views, 0),
    totalComments: mockPosts.reduce((sum, post) => sum + post.comments, 0),
  };

  const teamMembers = [
    {
      name: '张三',
      role: '创始人 & 前端工程师',
      avatar: 'https://picsum.photos/100/100?random=20',
      bio: '热爱前端技术，专注于React生态',
      skills: ['React', 'TypeScript', 'Node.js'],
      github: 'zhangsan',
      wechat: 'zhangsan_wechat'
    },
    {
      name: '李四',
      role: '后端架构师',
      avatar: 'https://picsum.photos/100/100?random=21',
      bio: '多年后端开发经验，精通微服务架构',
      skills: ['Java', 'Spring Cloud', 'Docker'],
      github: 'lisi',
      wechat: 'lisi_wechat'
    },
    {
      name: '王五',
      role: 'UI设计师',
      avatar: 'https://picsum.photos/100/100?random=22',
      bio: '专注于用户体验和界面设计',
      skills: ['Figma', 'Sketch', 'UI/UX'],
      github: 'wangwu',
      wechat: 'wangwu_wechat'
    }
  ];

  const timelineEvents = [
    {
      year: '2023',
      events: [
        '博客平台v3.0发布',
        '用户数突破10000',
        '移动端应用上线'
      ]
    },
    {
      year: '2022',
      events: [
        '引入Markdown编辑器',
        '社区功能上线',
        '推出API接口'
      ]
    },
    {
      year: '2021',
      events: [
        '博客平台v2.0发布',
        '响应式设计优化',
        '开始开源贡献'
      ]
    },
    {
      year: '2020',
      events: [
        '博客平台v1.0上线',
        '第一个用户注册',
        '获得天使投资'
      ]
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* 关于我们简介 */}
        <Card className="about-intro-card">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <Title level={1}>关于我们</Title>
              <Paragraph className="intro-text">
                这是一个专注于技术分享和交流的博客平台，我们致力于为开发者提供一个
                高质量的技术内容创作和分享环境。在这里，你可以找到最新的技术趋势、
                深入的技术分析和实用的开发技巧。
              </Paragraph>
              <Paragraph>
                我们的使命是帮助开发者持续学习、分享经验、建立连接。
                无论你是初学者还是资深工程师，这里都有适合你的内容。
              </Paragraph>
              <Space size="large" className="intro-stats">
                <Statistic title="文章总数" value={blogStats.totalPosts} />
                <Statistic title="作者数量" value={blogStats.totalAuthors} />
                <Statistic title="总浏览量" value={blogStats.totalViews} />
                <Statistic title="总评论数" value={blogStats.totalComments} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <div className="intro-image">
                <img 
                  src="https://picsum.photos/600/400?random=30" 
                  alt="关于我们"
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* 团队成员 */}
        <Card title="我们的团队" className="team-card">
          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="member-card" hoverable>
                  <div className="member-header">
                    <Avatar size={80} src={member.avatar} />
                    <div className="member-info">
                      <Title level={4}>{member.name}</Title>
                      <p className="member-role">{member.role}</p>
                    </div>
                  </div>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-skills">
                    {member.skills.map(skill => (
                      <Tag key={skill} color="blue">{skill}</Tag>
                    ))}
                  </div>
                  <div className="member-social">
                    <Space size="middle">
                      <Button 
                        type="text" 
                        icon={<GithubOutlined />}
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                      />
                      <Button 
                        type="text" 
                        icon={<WechatOutlined />}
                        onClick={() => alert(`微信号: ${member.wechat}`)}
                      />
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 发展历程 */}
        <Card title="发展历程" className="timeline-card">
          <div className="timeline-container">
            {timelineEvents.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <List
                    dataSource={item.events}
                    renderItem={event => (
                      <List.Item>
                        <div className="timeline-event">{event}</div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 技术栈 */}
        <Card title="技术栈" className="tech-stack-card">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="tech-card" hoverable>
                <div className="tech-icon frontend">FE</div>
                <Title level={5}>前端技术</Title>
                <ul>
                  <li>React 18</li>
                  <li>Ant Design</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                </ul>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="tech-card" hoverable>
                <div className="tech-icon backend">BE</div>
                <Title level={5}>后端技术</Title>
                <ul>
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>Redis</li>
                </ul>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="tech-card" hoverable>
                <div className="tech-icon devops">DevOps</div>
                <Title level={5}>运维部署</Title>
                <ul>
                  <li>Docker</li>
                  <li>Kubernetes</li>
                  <li>GitHub Actions</li>
                  <li>AWS/GCP</li>
                </ul>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="tech-card" hoverable>
                <div className="tech-icon tools">Tools</div>
                <Title level={5}>开发工具</Title>
                <ul>
                  <li>VS Code</li>
                  <li>Git</li>
                  <li>Figma</li>
                  <li>Postman</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 联系我们 */}
        <Card title="联系我们" className="contact-card">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <Title level={4}>联系方式</Title>
              <List className="contact-list">
                <List.Item>
                  <MailOutlined className="contact-icon" />
                  <span>邮箱: contact@myblog.com</span>
                </List.Item>
                <List.Item>
                  <EnvironmentOutlined className="contact-icon" />
                  <span>地址: 北京市海淀区中关村</span>
                </List.Item>
                <List.Item>
                  <CalendarOutlined className="contact-icon" />
                  <span>工作时间: 周一至周五 9:00-18:00</span>
                </List.Item>
              </List>
              
              <Title level={4} style={{ marginTop: 32 }}>关注我们</Title>
              <Space size="large">
                <Button 
                  icon={<GithubOutlined />} 
                  size="large"
                  href="https://github.com/myblog"
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button 
                  icon={<ZhihuOutlined />} 
                  size="large"
                  href="https://zhihu.com/myblog"
                  target="_blank"
                >
                  知乎
                </Button>
                <Button 
                  icon={<WechatOutlined />} 
                  size="large"
                  onClick={() => alert('微信公众号: myblog_official')}
                >
                  微信公众号
                </Button>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>加入我们</Title>
              <Paragraph>
                我们正在寻找对技术充满热情的人才加入我们的团队。
                如果你热爱技术分享，有丰富的开发经验，欢迎联系我们。
              </Paragraph>
              <div className="join-us">
                <Countdown 
                  title="下一场技术分享会" 
                  value={Date.now() + 1000 * 60 * 60 * 24 * 7} 
                  format="D 天 H 时 m 分 s 秒"
                />
                <Button type="primary" size="large" style={{ marginTop: 16 }}>
                  立即报名
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default About;