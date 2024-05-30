const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const rootDate = new Date();

function getDate(_date) {
    const date = _date ? new Date(_date) : rootDate;

    // 获取各个部分
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 获取时区偏移（以分钟为单位）
    const timezoneOffset = -date.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    // 格式化为 RFC 2822 格式的字符串
    return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}${offsetMinutes}`;
}

hexo.extend.generator.register('xml', function(locals) {
  // 仿照 Liquid 内置的日期格式写法
  const template = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Xheldon Blog</title>
        <description>The Answer to Life, the Universe and Everything is...</description>
        <link>https://www.xheldon.com</link>
        <atom:link href="https://www.xheldon.com/feed.xml" rel="self" type="application/rss+xml" />
        <pubDate><%= getDate() %></pubDate>
        <lastBuildDate><%= getDate() %></lastBuildDate>
        <generator>Hexo v<%= version %></generator>
        <% for (post of posts.sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime())).slice(0, 10)) { %>
        <item>
            <title><%= post.title %></title>
            <description><%= bookmark_filter(post.content) %></description>
            <pubDate><%= getDate(post.date) %></pubDate>
            <link><%= post.permalink %></link>
            <guid isPermaLink="true"><%= post.permalink %></guid>
            <% for (tag of post.tags.data) { %>
                <category><%= tag.name %></category>
            <% } %>
            <% for (cat of post.categories.data) { %>
                <category><%- escape_html(cat.name) %></category>
            <% } %>
        </item>
        <% } %>
    </channel>
    </rss>`;

const bookmark_filter = hexo.extend.helper.get('bookmark_filter').bind(hexo);
const escape_html = hexo.extend.helper.get('escape_html').bind(hexo);

  const data = {
    posts: locals.posts.toArray(),
    getDate,
    version: hexo.version,
    escape_html,
    bookmark_filter,
  };

  const jsonContent = ejs.render(template, data);

  const outputPath = path.join('source/_posts', 'feed.xml');
  fs.writeFileSync(outputPath, jsonContent);

  return {
    path: 'feed.xml',
    data: jsonContent,
  };
});