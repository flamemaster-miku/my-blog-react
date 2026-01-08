import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../../api/blogService';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Tag,
  Upload,
  message,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  Switch,
  Tooltip
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  CodeOutlined,
  TableOutlined,
  HighlightOutlined,
  ClearOutlined,
  CheckOutlined,
  PushpinOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { mockPosts, mockCategories, mockTags } from '../../api/mockData';
import './index.css';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const WritePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (id) {
      const post = mockPosts.find(p => p.id === id);
      if (post) {
        setIsEditing(true);
        form.setFieldsValue({
          title: post.title,
          category: post.category,
          excerpt: post.excerpt
        });
        setContent(post.content);
        setSelectedTags(post.tags);
        setCoverImage(post.coverImage);
        updateWordCount(post.content);
      }
    }
  }, [id, form]);

  useEffect(() => {
    updateWordCount(content);
  }, [content]);

  const updateWordCount = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    if (autoSave) {
      localStorage.setItem('draft_content', newContent);
    }
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      setCoverImage('https://picsum.photos/800/400?random=' + Math.random());
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const handleSaveDraft = () => {
    const values = form.getFieldsValue();
    const draft = {
      ...values,
      content,
      tags: selectedTags,
      coverImage,
      savedAt: new Date().toLocaleString()
    };
    
    localStorage.setItem('blog_draft', JSON.stringify(draft));
    message.success('草稿已保存到本地');
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('blog_draft');
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      form.setFieldsValue({
        title: parsedDraft.title || '',
        category: parsedDraft.category || '',
        excerpt: parsedDraft.excerpt || ''
      });
      setContent(parsedDraft.content || '');
      setSelectedTags(parsedDraft.tags || []);
      setCoverImage(parsedDraft.coverImage || '');
      message.info(`加载了 ${parsedDraft.savedAt} 的草稿`);
    } else {
      message.info('没有找到草稿');
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('blog_draft');
    localStorage.removeItem('draft_content');
    form.resetFields();
    setContent('');
    setSelectedTags([]);
    setCoverImage('');
    message.success('草稿已清除');
  };

  const handlePublish = (values) => {
    const postData = {
      title: values.title,
      excerpt: values.excerpt,
      content,
      category: values.category,
      tags: selectedTags,
      coverImage: coverImage || 'https://picsum.photos/800/400?random=' + Math.random(),
      author: '当前用户'
    };

    if (isEditing) {
      // 更新文章
      const updatedPost = updatePost(id, postData);
      if (updatedPost) {
        message.success('文章更新成功');
        if (autoSave) clearDraft();
        navigate(`/post/${id}`);
      } else {
        message.error('更新文章失败');
      }
    } else {
      // 创建新文章
      const newPost = createPost(postData);
      message.success('文章发布成功');
      if (autoSave) clearDraft();
      navigate(`/post/${newPost.id}`);
    }
  };
  const insertMarkdown = (type) => {
    const textarea = document.querySelector('.editor-textarea textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';
    let cursorOffset = 0;

    switch (type) {
      case 'bold':
        newText = `**${selectedText || '粗体文字'}**`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'italic':
        newText = `*${selectedText || '斜体文字'}*`;
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'link':
        newText = `[${selectedText || '链接文字'}](https://example.com)`;
        cursorOffset = selectedText ? 0 : -8;
        break;
      case 'image':
        newText = `![${selectedText || '图片描述'}](https://example.com/image.jpg)`;
        cursorOffset = selectedText ? 0 : -11;
        break;
      case 'code':
        newText = selectedText ? `\`${selectedText}\`` : '`代码`';
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'codeblock':
        newText = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : '```\n代码块\n```';
        cursorOffset = selectedText ? 0 : 3;
        break;
      case 'quote':
        newText = selectedText ? `> ${selectedText}` : '> 引用文字';
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'ul':
        newText = selectedText ? `- ${selectedText}` : '- 列表项';
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'ol':
        newText = selectedText ? `1. ${selectedText}` : '1. 列表项';
        cursorOffset = selectedText ? 0 : 3;
        break;
      case 'h1':
        newText = `# ${selectedText || '一级标题'}`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'h2':
        newText = `## ${selectedText || '二级标题'}`;
        cursorOffset = selectedText ? 0 : 3;
        break;
      case 'h3':
        newText = `### ${selectedText || '三级标题'}`;
        cursorOffset = selectedText ? 0 : 4;
        break;
      case 'table':
        newText = `| 标题1 | 标题2 |\n|-------|-------|\n| 内容1 | 内容2 |`;
        cursorOffset = 0;
        break;
      default:
        return;
    }

    const newContent = 
      content.substring(0, start) + 
      newText + 
      content.substring(end);
    
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + newText.length + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const markdownButtons = [
    { type: 'h1', label: 'H1', title: '一级标题' },
    { type: 'h2', label: 'H2', title: '二级标题' },
    { type: 'h3', label: 'H3', title: '三级标题' },
    { type: 'bold', icon: <BoldOutlined />, title: '加粗' },
    { type: 'italic', icon: <ItalicOutlined />, title: '斜体' },
    { type: 'quote', icon: <PushpinOutlined />, title: '引用' },
    { type: 'link', icon: <LinkOutlined />, title: '链接' },
    { type: 'image', icon: <PictureOutlined />, title: '图片' },
    { type: 'code', icon: <CodeOutlined />, title: '行内代码' },
    { type: 'codeblock', icon: <HighlightOutlined />, title: '代码块' },
    { type: 'ul', icon: <UnorderedListOutlined />, title: '无序列表' },
    { type: 'ol', icon: <OrderedListOutlined />, title: '有序列表' },
    { type: 'table', icon: <TableOutlined />, title: '表格' },
  ];

  const renderPreview = () => {
    const title = form.getFieldValue('title') || '文章标题';
    const excerpt = form.getFieldValue('excerpt') || '文章摘要';

    return (
      <div className="preview-container">
        <Card>
          <div className="preview-header">
            <Title level={2}>{title}</Title>
            {excerpt && (
              <div className="preview-excerpt">
                <Text type="secondary">{excerpt}</Text>
              </div>
            )}
            {coverImage && (
              <div className="preview-cover">
                <img src={coverImage} alt="封面预览" />
              </div>
            )}
            <div className="preview-meta">
              <Space size="large">
                <Text type="secondary">作者: 当前用户</Text>
                <Text type="secondary">发布时间: {new Date().toLocaleDateString()}</Text>
                {selectedTags.length > 0 && (
                  <Space>
                    {selectedTags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                )}
              </Space>
            </div>
          </div>

          <Divider />

          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || '在这里输入文章内容...'}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
    );
  };

  const renderEditor = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handlePublish}
        className="write-post-form"
      >
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item
              name="title"
              label="文章标题"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select placeholder="请选择分类" size="large">
                {mockCategories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={16}>
            <Form.Item label="标签">
              <Select
                mode="multiple"
                placeholder="选择标签"
                value={selectedTags}
                onChange={handleTagChange}
                size="large"
              >
                {mockTags.map(tag => (
                  <Option key={tag} value={tag}>
                    <Tag>{tag}</Tag>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="封面图片">
              <Upload
                name="cover"
                listType="picture-card"
                showUploadList={false}
                onChange={handleUpload}
              >
                {coverImage ? (
                  <img src={coverImage} alt="cover" className="cover-preview" />
                ) : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传封面</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="excerpt"
          label="文章摘要"
          rules={[{ required: true, message: '请输入文章摘要' }]}
        >
          <TextArea 
            placeholder="请输入文章摘要" 
            rows={3} 
            showCount 
            maxLength={200}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="editor-label">
              <span>文章内容</span>
              <Space>
                <Text type="secondary">字数: {wordCount}</Text>
                <Switch
                  checkedChildren="自动保存"
                  unCheckedChildren="手动保存"
                  checked={autoSave}
                  onChange={setAutoSave}
                  size="small"
                />
              </Space>
            </div>
          }
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <div className="editor-container">
            <div className="editor-toolbar">
              <Space wrap>
                {markdownButtons.map((btn) => (
                  <Tooltip key={btn.type} title={btn.title}>
                    <Button 
                      type="text" 
                      onClick={() => insertMarkdown(btn.type)}
                      className="toolbar-btn"
                    >
                      {btn.icon || btn.label}
                    </Button>
                  </Tooltip>
                ))}
              </Space>
            </div>
            
            <div className="editor-textarea">
              <TextArea
                value={content}
                onChange={handleContentChange}
                placeholder="使用 Markdown 语法编写文章..."
                rows={20}
                className="markdown-editor"
              />
            </div>
            
            <div className="editor-footer">
              <Text type="secondary">
                <Space>
                  <span>支持 Markdown 语法</span>
                  <span>•</span>
                  <span>字数: {wordCount}</span>
                  <span>•</span>
                  <span>自动保存: {autoSave ? '开启' : '关闭'}</span>
                </Space>
              </Text>
            </div>
          </div>
        </Form.Item>

        <Divider />

        <Form.Item className="form-actions">
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Button onClick={loadDraft}>
                  加载草稿
                </Button>
                <Button onClick={clearDraft} danger>
                  清除草稿
                </Button>
                <Button 
                  onClick={handleSaveDraft}
                  icon={<SaveOutlined />}
                >
                  保存草稿
                </Button>
              </Space>
            </Col>
            <Col>
              <Space size="large">
                <Button 
                  size="large"
                  onClick={() => navigate('/')}
                >
                  取消
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  size="large"
                  icon={<CheckOutlined />}
                >
                  {isEditing ? '更新文章' : '发布文章'}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="write-post-page">
      <div className="container">
        <Card>
          <div className="write-post-header">
            <Title level={3}>
              {isEditing ? '编辑文章' : '写新文章'}
              {preview && ' - 预览'}
            </Title>
            <Space>
              <Tooltip title={preview ? '返回编辑' : '预览文章'}>
                <Button 
                  type={preview ? 'default' : 'primary'} 
                  onClick={() => setPreview(!preview)}
                  icon={preview ? <EditOutlined /> : <EyeOutlined />}
                >
                  {preview ? '编辑' : '预览'}
                </Button>
              </Tooltip>
            </Space>
          </div>

          <Divider />

          {preview ? renderPreview() : renderEditor()}
        </Card>
      </div>
    </div>
  );
};

export default WritePost;