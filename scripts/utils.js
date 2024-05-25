const path = require('path');

hexo.extend.helper.register('filename', function(filePath) {
  return path.basename(filePath) + '.html';
});