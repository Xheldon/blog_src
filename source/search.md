---
layout: false
permalink: /search.json
---

[
  <% site.posts.forEach(function(post, key) { %>
    {
      "title"    : "<%= post.title %>",
      "subtitle" : "<% if (post.subtitle) { %><%= post.subtitle %><% } else { %> <%= post.callout %><% } %>",
      "tags"     : "<%= post.tags.join(', ') %>",
      "url"      : "<%= site.baseurl %><%= post.url %>",
      "date"     : "<%= post.date %>"
    } <% if (key === site.posts.length - 1) { %>,<% } %>
  <% }) %>
]