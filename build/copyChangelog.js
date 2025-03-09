const fs = require('fs');
const path = require('path');

/**
 * 复制 CHANGELOG.md 文件到 docs 目录
 */
function copyChangelogToDocs() {
    const sourcePath = path.join(__dirname, '../CHANGELOG.md');
    const destinationPath = path.join(__dirname, '../docs', 'CHANGELOG.md');

    // 确保 docs 目录存在
    const docsDir = path.join(__dirname, 'docs');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
    }

    // 读取源文件并写入目标文件
    fs.copyFileSync(sourcePath, destinationPath);
    console.log('CHANGELOG.md 已成功复制到 docs 目录');
}

// 调用函数
copyChangelogToDocs();
