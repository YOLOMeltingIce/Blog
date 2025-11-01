const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const https = require('https');
const http = require('http');
const fs = require('fs');

// 创建一个支持 HTTP/1.1 的 Agent
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 1,
  keepAliveMsecs: 3000
});

// 配置（严禁硬编码 Token/ID）
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAPERS_DATABASE_ID = process.env.NOTION_PAPERS_DATABASE_ID;
const PROJECTS_DATABASE_ID = process.env.NOTION_PROJECTS_DATABASE_ID;
const AI_TIMELINE_DATABASE_ID = process.env.NOTION_AI_TIMELINE_DATABASE_ID;
const PRODUCTS_DATABASE_ID = process.env.NOTION_PRODUCTS_DATABASE_ID;

if (!NOTION_TOKEN || !PAPERS_DATABASE_ID || !PROJECTS_DATABASE_ID || !AI_TIMELINE_DATABASE_ID) {
  console.error('Missing Notion env. Please set NOTION_TOKEN and all required DATABASE_IDs.');
  process.exit(1);
}

// 确保数据目录存在
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 从 Notion 属性中提取文本内容
function extractTextFromProperty(property) {
  if (!property) return '';

  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text?.map((text) => text.plain_text).join('') || '';
    case 'select':
      return property.select?.name || '';
    case 'multi_select':
      return property.multi_select?.map((item) => item.name).join(', ') || '';
    case 'date':
      return property.date?.start || '';
    case 'number':
      return property.number?.toString() || '';
    case 'url':
      return property.url || '';
    default:
      return '';
  }
}

// 从 Notion 属性中提取数组内容
function extractArrayFromProperty(property) {
  if (!property) return [];

  switch (property.type) {
    case 'multi_select':
      return property.multi_select?.map((item) => item.name) || [];
    case 'rich_text':
      const text = property.rich_text?.map((text) => text.plain_text).join('') || '';
      // 如果是逗号分隔的字符串，拆分成数组
      return text ? text.split(',').map(item => item.trim()).filter(item => item) : [];
    default:
      return [];
  }
}

// 从 Notion 属性中提取数字
function extractNumberFromProperty(property) {
  if (!property) return 0;
  
  switch (property.type) {
    case 'number':
      return property.number || 0;
    case 'select':
      // 如果是评分类的 select，尝试解析数字
      const name = property.select?.name || '';
      const match = name.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    default:
      return 0;
  }
}

// 使用 HTTP 请求查询数据库（带重试机制）
async function getDatabasePages(databaseId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await new Promise((resolve, reject) => {
        const postData = JSON.stringify({});
        
        const options = {
          hostname: 'api.notion.com',
          port: 443,
          path: `/v1/databases/${databaseId}/query`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'Connection': 'keep-alive',
            'User-Agent': 'Node.js'
          },
          // 使用自定义 agent 以确保 HTTP/1.1
          agent: agent
        };

        const req = https.request(options, (res) => {
          res.setEncoding('utf8'); // 设置UTF-8编码
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              
              if (result.object === 'error') {
                console.error('Notion API 错误:', result.code, result.message);
                resolve([]);
              } else {
                resolve(result.results || []);
              }
            } catch (e) {
              reject(new Error(`解析响应失败: ${e.message}`));
            }
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.setTimeout(10000, () => {
          req.destroy();
          reject(new Error('请求超时'));
        });

        req.write(postData);
        req.end();
      });
      
      return result;
    } catch (error) {
      console.error(`请求失败 (尝试 ${i + 1}/${retries}):`, error.message);
      if (i < retries - 1) {
        console.log('等待 2 秒后重试...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  console.error('所有重试都失败了，返回空数据');
  return [];
}

// 获取论文数据
async function fetchPapersData() {
  console.log('📚 正在获取论文数据...');
  
  try {
    const pages = await getDatabasePages(PAPERS_DATABASE_ID);
    
    const papers = pages.map(page => {
      const props = page.properties;
      const paperDate = extractTextFromProperty(props['Date'] || props['日期'] || props['论文发表时间']);
      
      return {
        id: page.id,
        title: extractTextFromProperty(props['标题'] || props['Title'] || props['论文标题']),
        authors: extractArrayFromProperty(props['作者'] || props['Authors']),
        journal: extractTextFromProperty(props['期刊'] || props['Journal'] || props['会议']),
        year: new Date(paperDate || Date.now()).getFullYear(),
        date: paperDate, // 论文发表时间
        readDate: extractTextFromProperty(props['阅读日期'] || props['Read Date']), // 阅读日期
        category: extractTextFromProperty(props['分类'] || props['Category'] || props['类别']), // 分类
        // 新字段
        summary: extractTextFromProperty(props['概要'] || props['Summary']),
        reason: extractTextFromProperty(props['阅读理由'] || props['Reason']),
        coreContent: extractTextFromProperty(props['论文核心内容'] || props['核心内容'] || props['Core Content']),
        insights: extractTextFromProperty(props['我的感悟'] || props['感悟'] || props['Insights']),
        // 旧字段保留兼容
        review: extractTextFromProperty(props['内容总结'] || props['读后感'] || props['Review']),
        keyInsights: extractArrayFromProperty(props['关键洞见'] || props['Key Insights']),
      };
    }).sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());

    const papersData = {
      papers,
      lastUpdated: new Date().toISOString(),
      count: papers.length
    };

    fs.writeFileSync(
      path.join(dataDir, 'papers.json'),
      JSON.stringify(papersData, null, 2),
      'utf-8'
    );

    console.log(`✅ 成功获取 ${papers.length} 篇论文数据`);
    return papersData;
  } catch (error) {
    console.error('❌ 获取论文数据失败:', error);
    return { papers: [], lastUpdated: new Date().toISOString(), count: 0 };
  }
}

// 获取项目数据
async function fetchProjectsData() {
  console.log('🚀 正在获取项目数据...');
  
  try {
    const pages = await getDatabasePages(PROJECTS_DATABASE_ID);
    
    const projects = pages.map(page => {
      const props = page.properties;
      
      return {
        id: page.id,
        title: extractTextFromProperty(props['项目名称'] || props['Title'] || props['标题']),
        description: extractTextFromProperty(props['项目描述'] || props['Description'] || props['描述']),
        status: extractTextFromProperty(props['状态'] || props['Status']) || 'completed',
        technologies: extractArrayFromProperty(props['技术栈'] || props['Technologies'] || props['Tech Stack']),
        highlights: extractArrayFromProperty(props['项目亮点'] || props['Highlights'] || props['亮点']),
        githubUrl: extractTextFromProperty(props['GitHub'] || props['Github URL'] || props['代码链接']),
        demoUrl: extractTextFromProperty(props['Demo'] || props['Demo URL'] || props['演示链接']),
        startDate: extractTextFromProperty(props['开始日期'] || props['Start Date']),
        endDate: extractTextFromProperty(props['结束日期'] || props['End Date']),
      };
    });

    const projectsData = {
      projects,
      lastUpdated: new Date().toISOString(),
      count: projects.length
    };

    fs.writeFileSync(
      path.join(dataDir, 'projects.json'),
      JSON.stringify(projectsData, null, 2),
      'utf-8'
    );

    console.log(`✅ 成功获取 ${projects.length} 个项目数据`);
    return projectsData;
  } catch (error) {
    console.error('❌ 获取项目数据失败:', error);
    return { projects: [], lastUpdated: new Date().toISOString(), count: 0 };
  }
}

// 获取 AI 时间轴数据
async function fetchAITimelineData() {
  console.log('🤖 正在获取 AI 时间轴数据...');
  
  try {
    const pages = await getDatabasePages(AI_TIMELINE_DATABASE_ID);
    
    const events = pages.map(page => {
      const props = page.properties;
      
      return {
        id: page.id,
        title: extractTextFromProperty(props['事件'] || props['Title'] || props['标题']),
        date: extractTextFromProperty(props['时间'] || props['Date'] || props['日期']),
        description: extractTextFromProperty(props['描述'] || props['Description'] || props['事件描述']),
        category: extractTextFromProperty(props['分类'] || props['Category'] || props['类别']),
        impact: extractTextFromProperty(props['影响'] || props['Impact'] || props['重要性']),
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const timelineData = {
      events,
      lastUpdated: new Date().toISOString(),
      count: events.length
    };

    fs.writeFileSync(
      path.join(dataDir, 'ai-timeline.json'),
      JSON.stringify(timelineData, null, 2),
      'utf-8'
    );

    console.log(`✅ 成功获取 ${events.length} 个 AI 时间轴事件`);
    return timelineData;
  } catch (error) {
    console.error('❌ 获取 AI 时间轴数据失败:', error);
    return { events: [], lastUpdated: new Date().toISOString(), count: 0 };
  }
}

// 从 Notion 属性中提取文件/图片 URL
function extractFileFromProperty(property) {
  if (!property) return '';
  
  switch (property.type) {
    case 'files':
      return property.files?.[0]?.file?.url || property.files?.[0]?.external?.url || '';
    case 'url':
      return property.url || '';
    default:
      return '';
  }
}

// 获取产品体验数据
async function fetchProductsData() {
  console.log('📱 正在获取产品体验数据...');
  
  if (!PRODUCTS_DATABASE_ID) {
    console.log('⚠️ 未配置产品数据库ID，跳过产品数据获取');
    return { products: [], lastUpdated: new Date().toISOString(), count: 0 };
  }
  
  try {
    const pages = await getDatabasePages(PRODUCTS_DATABASE_ID);
    
    const products = pages.map(page => {
      const props = page.properties;
      
      return {
        id: page.id,
        name: extractTextFromProperty(props['Name'] || props['名称'] || props['产品名称']),
        icon: extractFileFromProperty(props['图标'] || props['Icon'] || props['IconURL']),
        category: extractTextFromProperty(props['类别'] || props['Category']),
        company: extractTextFromProperty(props['公司'] || props['Company']),
        country: extractTextFromProperty(props['国家'] || props['Country']),
        updateDate: extractTextFromProperty(props['更新日期'] || props['Update Date'] || props['日期']),
        positioning: extractTextFromProperty(props['定位'] || props['Positioning']),
        coreCapabilities: extractTextFromProperty(props['核心能力'] || props['Core Capabilities']),
        userExperience: extractTextFromProperty(props['使用体验'] || props['User Experience']),
        complianceRisks: extractTextFromProperty(props['合规风险'] || props['Compliance Risks']),
        ecosystemAndScalability: extractTextFromProperty(props['生态系统与可扩展性'] || props['Ecosystem And Scalability']),
        commercialPotential: extractTextFromProperty(props['商业化潜力'] || props['Commercial Potential']),
      };
    });

    const productsData = {
      products,
      lastUpdated: new Date().toISOString(),
      count: products.length
    };

    fs.writeFileSync(
      path.join(dataDir, 'products.json'),
      JSON.stringify(productsData, null, 2),
      'utf-8'
    );

    console.log(`✅ 成功获取 ${products.length} 个产品数据`);
    return productsData;
  } catch (error) {
    console.error('❌ 获取产品数据失败:', error);
    return { products: [], lastUpdated: new Date().toISOString(), count: 0 };
  }
}

// 主函数
async function main() {
  console.log('🔄 开始从 Notion 获取数据...');
  console.log('⏰ 时间:', new Date().toLocaleString('zh-CN'));
  
  try {
    // 顺序获取数据（避免并发导致连接重置）
    const papersData = await fetchPapersData();
    const projectsData = await fetchProjectsData();
    const timelineData = await fetchAITimelineData();
    const productsData = await fetchProductsData();

    // 创建汇总信息
    const summary = {
      lastUpdated: new Date().toISOString(),
      papers: {
        count: papersData.count,
        lastUpdated: papersData.lastUpdated
      },
      projects: {
        count: projectsData.count,
        lastUpdated: projectsData.lastUpdated
      },
      aiTimeline: {
        count: timelineData.count,
        lastUpdated: timelineData.lastUpdated
      },
      products: {
        count: productsData.count,
        lastUpdated: productsData.lastUpdated
      }
    };

    fs.writeFileSync(
      path.join(dataDir, 'summary.json'),
      JSON.stringify(summary, null, 2),
      'utf-8'
    );

    console.log('🎉 数据获取完成！');
    console.log(`📊 汇总: ${papersData.count} 篇论文, ${projectsData.count} 个项目, ${timelineData.count} 个 AI 事件, ${productsData.count} 个产品`);
    console.log('📁 数据已保存到 data/ 目录');
    
  } catch (error) {
    console.error('❌ 数据获取过程中发生错误:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { fetchPapersData, fetchProjectsData, fetchAITimelineData, fetchProductsData };
