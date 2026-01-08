import React, { useState, useEffect } from 'react';
import { Timeline, Card, Select, Input, Tag, Empty, Skeleton, Row, Col } from 'antd';
import { CalendarOutlined, FolderOutlined, TagOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { mockPosts, mockCategories, mockTags } from '../../api/mockData';
import './index.css';
import { getAllPosts, getAllCategories, getAllTags } from '../../api/blogService';

const { Search } = Input;
const { Option } = Select;

const Archive = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const allPosts = getAllPosts(); // 从服务获取
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    let filtered = [...posts];

    // 按年份筛选
    if (selectedYear !== 'all') {
      filtered = filtered.filter(post => 
        new Date(post.date).getFullYear().toString() === selectedYear
      );
    }

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // 按标签筛选
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // 按搜索词筛选
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [selectedYear, selectedCategory, selectedTag, searchQuery, posts]);

  // 获取所有年份
  const getYears = () => {
    const years = new Set(posts.map(post => new Date(post.date).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  };

  // 按年份分组文章
  const groupPostsByYear = () => {
    const groups = {};
    filteredPosts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(post);
    });
    return groups;
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleTagChange = (value) => {
    setSelectedTag(value);
  };

  const postGroups = groupPostsByYear();
  const years = getYears();

  return (
    <div className="archive-page">
      <div className="container">
        {/* 顶部筛选器 */}
        <Card className="archive-filter-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={6}>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                placeholder="选择年份"
                style={{ width: '100%' }}
                suffixIcon={<CalendarOutlined />}
              >
                <Option value="all">全部年份</Option>
                {years.map(year => (
                  <Option key={year} value={year.toString()}>{year}年</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="选择分类"
                style={{ width: '100%' }}
                suffixIcon={<FolderOutlined />}
              >
                <Option value="all">全部分类</Option>
                {mockCategories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                value={selectedTag}
                onChange={handleTagChange}
                placeholder="选择标签"
                style={{ width: '100%' }}
                suffixIcon={<TagOutlined />}
              >
                <Option value="all">全部标签</Option>
                {mockTags.map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Search
                placeholder="搜索文章..."
                allowClear
                onSearch={handleSearch}
                enterButton={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Card>

        {/* 统计信息 */}
        <Card className="archive-stats-card">
          <Row gutter={[24, 24]}>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-number">{filteredPosts.length}</div>
                <div className="stat-label">文章总数</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-number">{years.length}</div>
                <div className="stat-label">创作年份</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-number">{mockCategories.length}</div>
                <div className="stat-label">分类数量</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-number">{mockTags.length}</div>
                <div className="stat-label">标签数量</div>
              </div>
            </Col>
          </Row>
        </Card>

        {loading ? (
          <Card>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Card>
        ) : filteredPosts.length > 0 ? (
          // 时间线展示
          <Timeline mode="alternate" className="archive-timeline">
            {Object.entries(postGroups)
              .sort((a, b) => b[0] - a[0])
              .map(([year, yearPosts]) => (
                <Timeline.Item 
                  key={year} 
                  label={<div className="timeline-year">{year}年</div>}
                  color="blue"
                >
                  <div className="year-posts">
                    {yearPosts.map(post => (
                      <Link to={`/post/${post.id}`} key={post.id}>
                        <Card className="archive-post-card" hoverable>
                          <div className="post-header">
                            <h3>{post.title}</h3>
                            <div className="post-meta">
                              <span className="post-date">{post.date}</span>
                              <Tag color="blue" className="post-category">
                                {post.category}
                              </Tag>
                            </div>
                          </div>
                          <p className="post-excerpt">{post.excerpt}</p>
                          <div className="post-tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="more-tags">+{post.tags.length - 3}</span>
                            )}
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </Timeline.Item>
              ))}
          </Timeline>
        ) : (
          <Card>
            <Empty description="没有找到符合条件的文章" />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Archive;