#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查是否需要更新数据
function shouldUpdateData() {
  const summaryFile = path.join(process.cwd(), 'data', 'summary.json');
  
  if (!fs.existsSync(summaryFile)) {
    console.log('📊 数据文件不存在，需要获取数据');
    return true;
  }

  try {
    const summary = JSON.parse(fs.readFileSync(summaryFile, 'utf-8'));
    const lastUpdated = new Date(summary.lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60);

    // 如果超过 24 小时，则更新数据
    if (hoursSinceUpdate > 24) {
      console.log(`📊 数据已过期 (${Math.round(hoursSinceUpdate)} 小时前更新)，需要更新`);
      return true;
    }

    console.log(`📊 数据仍然新鲜 (${Math.round(hoursSinceUpdate)} 小时前更新)，跳过更新`);
    return false;
  } catch (error) {
    console.log('📊 无法读取数据摘要，需要获取数据');
    return true;
  }
}

// 主函数
function main() {
  console.log('🔄 检查数据更新状态...');
  
  if (shouldUpdateData()) {
    console.log('🚀 开始更新数据...');
    try {
      execSync('node scripts/fetch-notion-data.js', { stdio: 'inherit' });
      console.log('✅ 数据更新完成！');
    } catch (error) {
      console.error('❌ 数据更新失败:', error.message);
      process.exit(1);
    }
  } else {
    console.log('✨ 数据无需更新');
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { shouldUpdateData };


