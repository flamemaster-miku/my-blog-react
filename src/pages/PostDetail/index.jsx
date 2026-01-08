import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Tag,
  Avatar,
  Space,
  Button,
  Divider,
  List,
  Input,
  Form,
  message,
  Skeleton,
  Row,
  Col,
  Typography
} from 'antd';
import {
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostById } from '../../api/blogService';
import { mockPosts, mockUsers } from '../../api/mockData';
import './index.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
        setLikes(foundPost.likes);
        setComments([
          {
            id: '1',
            author: '用户A',
            avatar: 'https://picsum.photos/50/50?random=10',
            content: '这篇文章很有深度，学到了很多！',
            datetime: '2023-12-15 10:30',
            replies: [
              {
                id: '1-1',
                author: '作者',
                avatar: 'https://picsum.photos/50/50?random=11',
                content: '谢谢支持！',
                datetime: '2023-12-15 11:00'
              }
            ]
          },
          {
            id: '2',
            author: '用户B',
            avatar: 'https://picsum.photos/50/50?random=12',
            content: '期待后续的系列文章！',
            datetime: '2023-12-15 14:20'
          }
        ]);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      message.success('取消点赞');
    } else {
      setLikes(likes + 1);
      message.success('点赞成功');
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (!commentValue.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newComment = {
        id: Date.now().toString(),
        author: '当前用户',
        avatar: 'https://picsum.photos/50/50?random=13',
        content: commentValue,
        datetime: '刚刚'
      };
      
      setComments([newComment, ...comments]);
      setCommentValue('');
      form.resetFields();
      setSubmitting(false);
      message.success('评论发表成功');
    }, 500);
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    message.info('文章已删除');
    navigate('/');
  };

  const handleShare = () => {
    message.success('链接已复制到剪贴板');
  };

  if (loading) {
    return (
      <div className="container post-detail-loading">
        <Card>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container post-not-found">
        <Card>
          <Title level={2}>文章不存在</Title>
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="container">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="back-button"
        >
          返回列表
        </Button>

        <Card className="post-content-card">
          <div className="post-header">
            <Title level={2}>{post.title}</Title>
            
            <div className="post-meta">
              <Space size="large" wrap>
                <span>
                  <Avatar src={mockUsers[0]?.avatar} size="small" />
                  <span className="author-name">{post.author}</span>
                </span>
                <span>
                  <CalendarOutlined /> {post.date}
                </span>
                <span>
                  <EyeOutlined /> {post.views}
                </span>
                <span>
                  <Tag color="blue">{post.category}</Tag>
                </span>
              </Space>
            </div>

            <div className="post-tags">
              {post.tags.map(tag => (
                <Tag key={tag} color="geekblue">{tag}</Tag>
              ))}
            </div>
          </div>

          <Divider />

          {post.coverImage && (
            <div className="post-cover">
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}

          {/* 这里是修正的部分：将 className 移到外层 div */}
          <div className="post-body">
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <Divider />
          <div className="post-actions">
            <Space size="large">
              <Button
                type={liked ? 'primary' : 'default'}
                icon={liked ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleLike}
              >
                喜欢 ({likes})
              </Button>
              <Button icon={<MessageOutlined />}>
                评论 ({comments.length})
              </Button>
              <Button icon={<ShareAltOutlined />} onClick={handleShare}>
                分享
              </Button>
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                编辑
              </Button>
              <Button 
                icon={<DeleteOutlined />} 
                danger
                onClick={handleDelete}
              >
                删除
              </Button>
            </Space>
          </div>
        </Card>

        <Card title={`评论 (${comments.length})`} className="comments-card">
          <Form form={form}>
            <Form.Item>
              <TextArea
                rows={4}
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="写下你的评论..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleCommentSubmit}
                type="primary"
              >
                发表评论
              </Button>
            </Form.Item>
          </Form>

          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
              <li>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <div>
                        <span style={{ marginRight: 8, fontWeight: 'bold' }}>{item.author}</span>
                        <span style={{ fontSize: 12, color: '#999' }}>{item.datetime}</span>
                      </div>
                    }
                    description={<div style={{ color: '#333' }}>{item.content}</div>}
                  />
                  {item.replies && item.replies.length > 0 && (
                    <List
                      size="small"
                      dataSource={item.replies}
                      style={{ marginTop: 16, marginLeft: 40 }}
                      renderItem={reply => (
                        <List.Item style={{ border: 'none', padding: '8px 0' }}>
                          <List.Item.Meta
                            avatar={<Avatar size="small" src={reply.avatar} />}
                            title={
                              <div>
                                <span style={{ marginRight: 8, fontSize: 14 }}>{reply.author}</span>
                                <span style={{ fontSize: 11, color: '#999' }}>{reply.datetime}</span>
                              </div>
                            }
                            description={<div style={{ color: '#666', fontSize: 13 }}>{reply.content}</div>}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </List.Item>
              </li>
            )}
          />
        </Card>

        <Card title="相关文章" className="related-posts-card">
          <Row gutter={[16, 16]}>
            {mockPosts
              .filter(p => p.id !== id && p.category === post.category)
              .slice(0, 3)
              .map(relatedPost => (
                <Col xs={24} md={8} key={relatedPost.id}>
                  <Card
                    hoverable
                    onClick={() => navigate(`/post/${relatedPost.id}`)}
                    className="related-post-card"
                    cover={<img alt={relatedPost.title} src={relatedPost.coverImage} />}
                  >
                    <Card.Meta
                      title={relatedPost.title}
                      description={
                        <Space>
                          <span>{relatedPost.date}</span>
                          <span>·</span>
                          <span>{relatedPost.views} 阅读</span>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default PostDetail;