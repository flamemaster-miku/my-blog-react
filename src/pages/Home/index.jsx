import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Tag, 
  Pagination, 
  Skeleton, 
  Empty, 
  Select, 
  Input, 
  Button, 
  Space,
  message  // 添加这个
} from 'antd';
import { CalendarOutlined, EyeOutlined, LikeOutlined, MessageOutlined, ReloadOutlined, FireOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllPosts, getAllCategories, getAllTags } from '../../api/blogService';
import PostCard from '../../components/PostCard';  // 修正路径
import './index.css';

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // 用于强制刷新

  // 从 URL 参数中获取搜索词
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location]);

  // 加载数据
  useEffect(() => {
    loadPosts();
    loadCategoriesAndTags();
  }, [selectedCategory, selectedTag, searchQuery, refreshKey]);

  const loadPosts = () => {
    setLoading(true);
    // 模拟数据加载延迟
    setTimeout(() => {
      try {
        const allPosts = getAllPosts();
        const filteredPosts = filterPosts(allPosts);
        setPosts(filteredPosts);
        setTotal(filteredPosts.length);
      } catch (error) {
        console.error('加载文章失败:', error);
        message.error('加载文章失败');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const loadCategoriesAndTags = () => {
    try {
      const allCategories = getAllCategories();
      const allTags = getAllTags();
      setCategories(allCategories);
      setTags(allTags);
    } catch (error) {
      console.error('加载分类和标签失败:', error);
      message.error('加载分类和标签失败');
    }
  };

  const filterPosts = (allPosts) => {
    let filtered = [...allPosts];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // 按日期倒序排列（最新文章在前）
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filtered;
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    
    // 更新 URL 参数
    if (value) {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      navigate('/');
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTagChange = (value) => {
    setSelectedTag(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('all');
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/');
    message.success('筛选条件已清除');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    message.success('数据已刷新');
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return posts.slice(startIndex, endIndex);
  };

  // 获取热门文章（按浏览量排序）
  const getPopularPosts = () => {
    const allPosts = getAllPosts();
    return [...allPosts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  };

  // 获取最新文章
  const getRecentPosts = () => {
    const allPosts = getAllPosts();
    return [...allPosts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const popularPosts = getPopularPosts();
  const recentPosts = getRecentPosts();

  return (
    <div className="home-page">
      {/* 顶部横幅 */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>我的博客</h1>
          <p>分享技术、记录成长、探索无限可能</p>
          <Search
            placeholder="搜索文章标题、内容或标签..."
            size="large"
            className="hero-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton
          />
          <div className="hero-stats">
            <Space size="large">
              <span>文章总数: {getAllPosts().length}</span>
              <span>分类: {categories.length}</span>
              <span>标签: {tags.length}</span>
            </Space>
          </div>
        </div>
      </div>

      <div className="container">
        <Row gutter={[24, 24]}>
          {/* 左侧内容区域 */}
          <Col xs={24} lg={18}>
            {/* 筛选器 */}
            <Card className="filter-card" size="small">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={8}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="filter-select"
                    placeholder="所有分类"
                    style={{ width: '100%' }}
                  >
                    <Option value="all">所有分类</Option>
                    {categories.map(category => (
                      <Option key={category} value={category}>{category}</Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    value={selectedTag}
                    onChange={handleTagChange}
                    className="filter-select"
                    placeholder="所有标签"
                    style={{ width: '100%' }}
                  >
                    <Option value="all">所有标签</Option>
                    {tags.map(tag => (
                      <Option key={tag} value={tag}>{tag}</Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Space>
                    <div className="post-count">
                      共找到 {total} 篇文章
                    </div>
                    <Button 
                      icon={<ReloadOutlined />} 
                      size="small" 
                      onClick={handleRefresh}
                      title="刷新数据"
                    />
                    {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
                      <Button 
                        size="small" 
                        onClick={handleClearFilters}
                      >
                        清除筛选
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* 文章列表 */}
            {loading ? (
              <div className="posts-grid">
                <Row gutter={[24, 24]}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                      <Card className="blog-card">
                        <Skeleton active paragraph={{ rows: 3 }} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : posts.length > 0 ? (
              <>
                <Row gutter={[24, 24]} className="posts-grid">
                  {getCurrentPagePosts().map(post => (
                    <Col xs={24} sm={12} lg={8} key={post.id}>
                      <PostCard post={post} />
                    </Col>
                  ))}
                </Row>
                
                {/* 分页 */}
                <div className="pagination-container">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageChange}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
                    pageSizeOptions={['9', '12', '18', '24']}
                  />
                </div>
              </>
            ) : (
              <Card className="empty-card">
                <Empty
                  description={
                    <div>
                      <p>没有找到符合条件的文章</p>
                      {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
                        <Button 
                          type="link" 
                          onClick={handleClearFilters}
                          style={{ marginTop: 16 }}
                        >
                          清除筛选条件
                        </Button>
                      )}
                    </div>
                  }
                />
              </Card>
            )}
          </Col>

          {/* 右侧边栏 */}
          <Col xs={24} lg={6}>
            {/* 热门文章 */}
            <Card 
              title={
                <Space>
                  <FireOutlined style={{ color: '#ff4d4f' }} />
                  <span>热门文章</span>
                </Space>
              } 
              className="sidebar-card"
            >
              {popularPosts.map((post, index) => (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <div className="sidebar-post-item">
                    <div className={`post-rank ${index < 3 ? 'top-rank' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="post-content">
                      <h4>{post.title}</h4>
                      <div className="post-meta">
                        <EyeOutlined /> {post.views}
                        <LikeOutlined /> {post.likes}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {popularPosts.length === 0 && (
                <div className="no-data">暂无热门文章</div>
              )}
            </Card>

            {/* 最新文章 */}
            <Card title="最新文章" className="sidebar-card">
              {recentPosts.map(post => (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <div className="sidebar-post-item">
                    <div className="post-content">
                      <h4>{post.title}</h4>
                      <div className="post-meta">
                        <CalendarOutlined /> {post.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {recentPosts.length === 0 && (
                <div className="no-data">暂无文章</div>
              )}
            </Card>

            {/* 分类统计 */}
            <Card title="文章分类" className="sidebar-card">
              <div className="category-list">
                {categories.map(category => (
                  <div 
                    key={category} 
                    className={`category-item ${category === selectedCategory ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category === selectedCategory ? 'all' : category)}
                  >
                    <span className="category-name">{category}</span>
                    <Tag className="category-count">
                      {getAllPosts().filter(post => post.category === category).length}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>

            {/* 标签云 */}
            <Card title="标签云" className="sidebar-card">
              <div className="tag-cloud">
                {tags.slice(0, 20).map(tag => (
                  <Tag
                    key={tag}
                    color={tag === selectedTag ? 'blue' : undefined}
                    className="tag-cloud-item"
                    onClick={() => handleTagChange(tag === selectedTag ? 'all' : tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
              {tags.length > 20 && (
                <div className="tag-more">
                  还有 {tags.length - 20} 个标签...
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;