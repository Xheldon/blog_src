---
layout:      page
title:       开源万岁
subtitle: 如果感到幸福你就开开源，嘿！
header-img:  "img/opensource-bg.png"
header-mask: 0.7
description: "开源·节流"
# short: true
permalink:   /projects/
---

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>介绍</th>
            <th>日期</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <% for (project of site.data.projects) { %>
        <tr>
            <th>
                <img style="max-width: 60px;" src="https://static.xheldon.cn/img/projects/<%= project.image %>" alt="<%= project.title %>" />
                <a style="color: #337ab7;" href="<%= project.url %>" target="_blank"><%= project.title %></a>
            </th>
            <td>
                <%= project.subtitle %>
            </td>
            <td>
                <%= project.date %>
            </td>
            <td>
                <% if (project.more) { %}
                    <%= project.more %>
                <% } else { %>
                    暂无
                <% } %>
            </td>
        </tr>
        <% } %>
    </tbody>
</table>
