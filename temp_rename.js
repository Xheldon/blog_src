const fs = require('fs');
const path = require('path');

// Step 2: Define the directory
const directoryPath = path.join(__dirname, 'source/_posts/');
console.log('dir:', directoryPath);

// Step 3: Read all files in the directory
function readDirectory(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log('无法扫描目录: ' + err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                // 递归调用读取子目录
                readDirectory(filePath);
            } else if (file.isFile() && file.name.endsWith('.md')) {
                // 匹配文件名中的日期部分
                const datePattern = /^\d{4}-\d{1,2}-\d{2}-/;
                if (datePattern.test(file.name)) {
                    // 去掉文件名中的日期部分
                    const newFileName = file.name.replace(datePattern, '');
                    const newFilePath = path.join(dir, newFileName);

                    // 重命名文件
                    fs.rename(filePath, newFilePath, err => {
                        if (err) {
                            console.log('重命名文件时出错:', err);
                        } else {
                            console.log(`重命名: ${file.name} -> ${newFileName}`);
                        }
                    });
                }
            }
        });
    });
}

// 开始读取目录
readDirectory(directoryPath)