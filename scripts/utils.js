const path = require('path');

hexo.extend.helper.register('filename', function(filePath) {
  return path.basename(filePath) + '.html';
});
hexo.extend.helper.register('bookmark_filter', function(input) {
  return input.replace(/<p><a class='link-bookmark' href='([\s\S]*?)' target='_blank'><span data-bookmark-img='([\s\S]*?)' data-bookmark-title='([\s\S]*?)'><img src='([\s\S]*?)'\/><\/span><span><span>([\s\S]*?)<\/span><span>([\s\S]*?)<\/span><span>([\s\S]*?)<\/span><\/span><\/a><\/p>/g, '<p><a href="$1" target="_blank">$5</a></p>');
});