const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

hexo.extend.generator.register('json', function(locals) {
  const template = `
  [
    <% posts.forEach(function(post, key) { %>
      {
        "title"    : "<%= post.title %>",
        "subtitle" : "<% if (post.subtitle) { %><%= post.subtitle %><% } else { %> <%= post.callout %><% } %>",
        "tags"     : "<%= post.tags.data.map(tag => tag.name).join(', ') %>",
        "url"      : "/<%= post.path %>",
        "date"     : "<%= post.date %>"
      } <% if (key !== posts.length - 1) { %>,<% } %>
    <% }) %>
  ]
  `;

  const data = {
    posts: locals.posts.toArray()
  };

  const jsonContent = ejs.render(template, data);

  const outputPath = path.join('source/_posts', 'search.json');
  fs.writeFileSync(outputPath, jsonContent);

  return {
    path: 'search.json',
    data: jsonContent
  };
});