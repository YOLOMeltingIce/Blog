// Notion API 相关类型定义
export interface NotionProperty {
  id: string;
  type: string;
  [key: string]: any;
}

export interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
  created_time: string;
  last_edited_time: string;
}

// AI 时间轴相关类型
export interface AITimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  impact: string;
}

// 论文读后感类型
export interface PaperReview {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  date?: string;          // 论文发表时间
  readDate: string;       // 阅读日期
  category?: string;      // 分类
  // 新增字段
  summary?: string;       // 概要
  reason?: string;        // 阅读理由
  coreContent?: string;   // 论文核心内容
  insights?: string;      // 我的感悟
  // 旧字段保留兼容
  review?: string;
  keyInsights?: string[];
}

// 项目经历类型
export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  startDate?: string;
  endDate?: string;
}

// 产品体验类型
export interface ProductExperience {
  id: string;
  name: string;
  icon?: string; // SVG或PNG URL
  category?: string;
  company?: string;
  country?: string;
  updateDate?: string;
  positioning?: string;
  coreCapabilities?: string;
  userExperience?: string;
  complianceRisks?: string;
  ecosystemAndScalability?: string;
  commercialPotential?: string;
}

// 个人简介类型
export interface PersonalInfo {
  name: string;
  bio: string;
  avatar?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    wechat?: string;
  };
  skills: string[];
  interests: string[];
}
