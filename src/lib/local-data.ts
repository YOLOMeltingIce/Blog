import { PaperReview, Project, AITimelineEvent, ProductExperience } from '@/types';
import fs from 'fs';
import path from 'path';

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data');
const PAPERS_FILE = path.join(DATA_DIR, 'papers.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const AI_TIMELINE_FILE = path.join(DATA_DIR, 'ai-timeline.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// 数据接口
interface PapersData {
  papers: PaperReview[];
  lastUpdated: string;
  count: number;
}

interface ProjectsData {
  projects: Project[];
  lastUpdated: string;
  count: number;
}

interface AITimelineData {
  events: AITimelineEvent[];
  lastUpdated: string;
  count: number;
}

interface ProductsData {
  products: ProductExperience[];
  lastUpdated: string;
  count: number;
}

// 读取本地论文数据
export async function getLocalPapersData(): Promise<PaperReview[]> {
  try {
    if (!fs.existsSync(PAPERS_FILE)) {
      console.warn('Papers data file not found, returning empty array');
      return [];
    }

    const fileContent = fs.readFileSync(PAPERS_FILE, 'utf-8');
    const data: PapersData = JSON.parse(fileContent);
    
    console.log(`📚 从本地文件读取 ${data.count} 篇论文数据 (更新于: ${new Date(data.lastUpdated).toLocaleString('zh-CN')})`);
    return data.papers;
  } catch (error) {
    console.error('Error reading local papers data:', error);
    return [];
  }
}

// 读取本地项目数据
export async function getLocalProjectsData(): Promise<Project[]> {
  try {
    if (!fs.existsSync(PROJECTS_FILE)) {
      console.warn('Projects data file not found, returning empty array');
      return [];
    }

    const fileContent = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    const data: ProjectsData = JSON.parse(fileContent);
    
    console.log(`🚀 从本地文件读取 ${data.count} 个项目数据 (更新于: ${new Date(data.lastUpdated).toLocaleString('zh-CN')})`);
    return data.projects;
  } catch (error) {
    console.error('Error reading local projects data:', error);
    return [];
  }
}

// 读取本地 AI 时间轴数据
export async function getLocalAITimelineData(): Promise<AITimelineEvent[]> {
  try {
    if (!fs.existsSync(AI_TIMELINE_FILE)) {
      console.warn('AI Timeline data file not found, returning empty array');
      return [];
    }

    const fileContent = fs.readFileSync(AI_TIMELINE_FILE, 'utf-8');
    const data: AITimelineData = JSON.parse(fileContent);
    
    console.log(`🤖 从本地文件读取 ${data.count} 个 AI 时间轴事件 (更新于: ${new Date(data.lastUpdated).toLocaleString('zh-CN')})`);
    return data.events;
  } catch (error) {
    console.error('Error reading local AI timeline data:', error);
    return [];
  }
}

// 读取本地产品体验数据
export async function getLocalProductsData(): Promise<ProductExperience[]> {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      console.warn('Products data file not found, returning empty array');
      return [];
    }

    const fileContent = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const data: ProductsData = JSON.parse(fileContent);
    
    console.log(`📱 从本地文件读取 ${data.count} 个产品数据 (更新于: ${new Date(data.lastUpdated).toLocaleString('zh-CN')})`);
    return data.products;
  } catch (error) {
    console.error('Error reading local products data:', error);
    return [];
  }
}

// 获取数据摘要信息
export function getDataSummary() {
  try {
    const summaryFile = path.join(DATA_DIR, 'summary.json');
    if (!fs.existsSync(summaryFile)) {
      return null;
    }

    const fileContent = fs.readFileSync(summaryFile, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading data summary:', error);
    return null;
  }
}
