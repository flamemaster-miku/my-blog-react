import React from 'react';
import { Card, Tag, Avatar, Space, Button } from 'antd';
import { 
  CalendarOutlined, 
  EyeOutlined, 
  LikeOutlined, 
  MessageOutlined,
  UserOutlined,
  ShareAltOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css';

const PostCard = ({ post }) => {
  const {
    id,
    title,
    excerpt,
    author,
    date,
    category,
    tags,
    views,
    likes,
    comments,
    coverImage
  } = post;

  const truncateExcerpt = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays <= 7) return `${diffDays}天前`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)}周前`;
    
    return dateStr;
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = `${window.location.origin}/post/${id}`;
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('链接已复制到剪贴板');
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('点赞功能开发中...');
  };

  const handleComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('评论功能开发中...');
  };

  return (
    <Link to={`/post/${id}`} className="post-card-link">
      <Card
        className="post-card"
        hoverable
        cover={
          coverImage ? (
            <div className="post-card-cover">
              <img 
                src={coverImage} 
                alt={title} 
                loading="lazy"
              />
              <div className="category-badge">
                <BookOutlined />
                <span>{category}</span>
              </div>
            </div>
          ) : null
        }
        actions={[
          <Button 
            type="text" 
            icon={<LikeOutlined />} 
            onClick={handleLike}
            className="card-action-btn"
          >
            {likes}
          </Button>,
          <Button 
            type="text" 
            icon={<MessageOutlined />} 
            onClick={handleComment}
            className="card-action-btn"
          >
            {comments}
          </Button>,
          <Button 
            type="text" 
            icon={<ShareAltOutlined />} 
            onClick={handleShare}
            className="card-action-btn"
          >
            分享
          </Button>
        ]}
      >
        <div className="post-card-content">
          <h3 className="post-card-title">{title}</h3>
          <p className="post-card-excerpt">{truncateExcerpt(excerpt)}</p>
          <div className="post-card-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} className="post-tag">
                {tag}
              </Tag>
            ))}
            {tags.length > 3 && (
              <span className="more-tags">+{tags.length - 3}</span>
            )}
          </div>
          <div className="post-card-footer">
            <Space size="middle" split={<span className="divider">·</span>}>
              <span className="post-meta">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="author">{author}</span>
              </span>
              <span className="post-meta">
                <CalendarOutlined />
                <span className="date">{formatDate(date)}</span>
              </span>
              <span className="post-meta">
                <EyeOutlined />
                <span className="views">{views}</span>
              </span>
            </Space>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;