// src/api/blogService.js

// 从 mockData 导入初始数据
import { mockPosts } from './mockData';

// 从 localStorage 获取文章或使用初始数据
const getStoredPosts = () => {
  const storedPosts = localStorage.getItem('blog_posts');
  if (storedPosts) {
    return JSON.parse(storedPosts);
  }
  return mockPosts;
};

// 保存文章到 localStorage
const savePosts = (posts) => {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
};

// 获取所有文章
export const getAllPosts = () => {
  return getStoredPosts();
};

// 根据ID获取文章
export const getPostById = (id) => {
  const posts = getStoredPosts();
  return posts.find(post => post.id === id);
};

// 创建新文章
export const createPost = (postData) => {
  const posts = getStoredPosts();
  const newPost = {
    ...postData,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    views: 0,
    likes: 0,
    comments: 0
  };
  
  const updatedPosts = [newPost, ...posts];
  savePosts(updatedPosts);
  return newPost;
};

// 更新文章
export const updatePost = (id, updatedData) => {
  const posts = getStoredPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    savePosts(posts);
    return posts[index];
  }
  
  return null;
};

// 删除文章
export const deletePost = (id) => {
  const posts = getStoredPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  savePosts(filteredPosts);
  return true;
};

// 获取分类
export const getAllCategories = () => {
  const posts = getStoredPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  return categories;
};

// 获取标签
export const getAllTags = () => {
  const posts = getStoredPosts();
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};