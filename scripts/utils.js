const path = require('path');

hexo.extend.helper.register('filename', function(filePath) {
  return path.basename(filePath) + '.html';
});
hexo.extend.helper.register('bookmark_filter', function(input) {
  return input.replace(/^\<p\>\<a\s+class=\"link-bookmark\"\shref=(.*)\starget=\"_blank\"\>\<span\>(.*)\<\/span\>\<span\>\<span\>(.*)\<\/span\>\<span\>\n(.*)\n\<\/span\>\<span\>(.*)\<\/span\>\<\/span\>\<\/a\>\<\/p\>$/, '<p><a href=$1 target="_blank">$4</a></p>');
});