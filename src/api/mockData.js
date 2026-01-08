export const mockPosts = [
  {
    id: '1',
    title: 'React Hooks 完全指南',
    content: `# React Hooks 完全指南

## 什么是 Hooks？

Hooks 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 常用的 Hooks

### 1. useState
\`\`\`javascript
const [state, setState] = useState(initialState);
\`\`\`

### 2. useEffect
\`\`\`javascript
useEffect(() => {
  // 执行副作用操作
  return () => {
    // 清理函数
  };
}, [dependencies]);
\`\`\`

### 3. useContext
\`\`\`javascript
const value = useContext(MyContext);
\`\`\`

## 自定义 Hooks

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。`,
    excerpt: '本文详细介绍了React Hooks的各种用法和最佳实践',
    author: '张三',
    authorId: '1',
    category: '前端开发',
    tags: ['React', 'JavaScript', '前端'],
    date: '2023-12-15',
    views: 1560,
    likes: 128,
    comments: 45,
    coverImage: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: '2',
    title: 'TypeScript 入门与实践',
    content: `# TypeScript 入门与实践

## TypeScript 简介

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6+ 的支持。

## 基础类型

\`\`\`typescript
let isDone: boolean = false;
let count: number = 42;
let name: string = "TypeScript";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10];
\`\`\`

## 接口和类型别名

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // 可选属性
}

type Point = {
  x: number;
  y: number;
};
\`\`\`

## 泛型

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\``,
    excerpt: '从零开始学习TypeScript，掌握类型系统的精髓',
    author: '李四',
    authorId: '2',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', '编程'],
    date: '2023-12-10',
    views: 2340,
    likes: 189,
    comments: 67,
    coverImage: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: '3',
    title: 'Node.js 高性能编程',
    content: `# Node.js 高性能编程

## Node.js 事件循环

Node.js 使用事件驱动的非阻塞 I/O 模型，使其轻量又高效。

## 异步编程

### Callback
\`\`\`javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
\`\`\`

### Promise
\`\`\`javascript
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
\`\`\`

### Async/Await
\`\`\`javascript
async function readFiles() {
  try {
    const data1 = await readFilePromise('file1.txt');
    const data2 = await readFilePromise('file2.txt');
    console.log(data1, data2);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## 性能优化

1. 使用连接池
2. 缓存计算结果
3. 使用集群模式`,
    excerpt: '深入探讨Node.js的性能优化技巧和最佳实践',
    author: '王五',
    authorId: '3',
    category: '后端开发',
    tags: ['Node.js', 'JavaScript', '后端'],
    date: '2023-12-05',
    views: 1890,
    likes: 156,
    comments: 42,
    coverImage: 'https://picsum.photos/800/400?random=3'
  },
  {
    id: '4',
    title: 'Ant Design 使用技巧',
    content: `# Ant Design 使用技巧

## Ant Design 简介

Ant Design 是蚂蚁金服推出的企业级 UI 设计语言和 React 组件库。

## 常用组件

### 布局组件
- Layout
- Grid
- Space

### 数据展示
- Table
- Card
- List

### 表单组件
- Form
- Input
- Select
- DatePicker

## 主题定制

\`\`\`javascript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
  <App />
</ConfigProvider>
\`\`\`

## 最佳实践

1. 按需加载组件
2. 使用响应式设计
3. 国际化支持`,
    excerpt: '分享Ant Design的高效使用方法和实战技巧',
    author: '赵六',
    authorId: '4',
    category: 'UI设计',
    tags: ['Ant Design', 'React', 'UI'],
    date: '2023-11-28',
    views: 1780,
    likes: 142,
    comments: 38,
    coverImage: 'https://picsum.photos/800/400?random=4'
  },
  {
    id: '5',
    title: '现代CSS开发技巧',
    content: `# 现代CSS开发技巧

## CSS Grid 布局

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.item {
  grid-column: span 4;
}
\`\`\`

## Flexbox 布局

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

## CSS自定义属性

\`\`\`css
:root {
  --primary-color: #1890ff;
  --border-radius: 6px;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 2);
}
\`\`\`

## CSS-in-JS

使用 styled-components 或 emotion 实现组件化样式。`,
    excerpt: '学习现代CSS的最新特性和开发技巧',
    author: '孙七',
    authorId: '5',
    category: 'CSS',
    tags: ['CSS', '前端', '样式'],
    date: '2023-11-20',
    views: 1620,
    likes: 134,
    comments: 41,
    coverImage: 'https://picsum.photos/800/400?random=5'
  }
];

export const mockCategories = [
  '前端开发',
  '后端开发',
  '移动开发',
  '数据库',
  '运维部署',
  '架构设计',
  '人工智能',
  '大数据'
];

export const mockTags = [
  'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript',
  'Node.js', 'Python', 'Java', 'Go', 'Rust',
  'CSS', 'HTML', 'Webpack', 'Vite', 'Docker',
  'Kubernetes', 'AWS', '微服务', '数据库', '算法'
];

export const mockUsers = [
  {
    id: '1',
    username: '张三',
    avatar: 'https://picsum.photos/100/100?random=1',
    bio: '前端开发工程师，热爱新技术',
    posts: 24,
    followers: 120,
    following: 45
  },
  {
    id: '2',
    username: '李四',
    avatar: 'https://picsum.photos/100/100?random=2',
    bio: '全栈开发者，喜欢分享技术',
    posts: 36,
    followers: 230,
    following: 89
  }
];