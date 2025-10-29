import { Client } from '@notionhq/client';
import { NotionPage } from '@/types';

const notionToken = process.env.NOTION_TOKEN as string | undefined;
if (!notionToken) {
  throw new Error('NOTION_TOKEN is not set. Please configure environment variables.');
}

const notion = new Client({
  auth: notionToken,
});

// 获取数据库中的所有页面
export async function getDatabasePages(databaseId: string): Promise<NotionPage[]> {
  try {
    const response = await (notion as any).databases.query({
      database_id: databaseId,
    });

    return response.results as NotionPage[];
  } catch (error) {
    console.error('Error fetching database pages:', error);
    return [];
  }
}

// 获取单个页面的详细内容
export async function getPageContent(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
}

// 从 Notion 属性中提取文本内容
export function extractTextFromProperty(property: any): string {
  if (!property) return '';

  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'select':
      return property.select?.name || '';
    case 'multi_select':
      return property.multi_select?.map((item: any) => item.name).join(', ') || '';
    case 'date':
      return property.date?.start || '';
    case 'number':
      return property.number?.toString() || '';
    default:
      return '';
  }
}

// 从 Notion 属性中提取数组内容
export function extractArrayFromProperty(property: any): string[] {
  if (!property) return [];

  switch (property.type) {
    case 'multi_select':
      return property.multi_select?.map((item: any) => item.name) || [];
    case 'rich_text':
      return property.rich_text?.map((text: any) => text.plain_text) || [];
    default:
      return [];
  }
}
