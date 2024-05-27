---
layout: page
description: 「订阅年年有，今年特别多」
hide-in-nav: true
header-img: "img/book-list-bg.png"
permalink: /subscribe/
multilingual: false
header-mask: 0.4
fullcontent: true
title: 订阅&付费软件
lastUpdateTime: 2022-02-23 11:31:59 +0800
---

{% comment %}
如果后续从 Notion 的 database 中读取的数据多了，考虑做成一个 html 模板
{% endcomment %}
<div class='notion-container'>
    <blockquote>
        说明: 本页数据来自 Notion database，由于 Notion API 的限制每秒最多只能
        有三个请求，因此缓存该数据后，每小时才会刷新一次。
    </blockquote>
    <div class="data-loading"><span></span><span></span><span></span><span></span><span></span></div>
    <table class='data-container'></table>
</div>
<script>
    /**
     * 应该返回的是形如
     * <tr>
     *  <td>Apple Music 订阅</td>
     *  <td>10元/月</td>
     *  <td>www.apple.com.cm/music</td>
     *  <td>其他说明</td>
     * </tr>
     * 的 dom 结构，考虑使用模板引擎
     */
    window.onload =  function () {
        const properties = ['名称','类型','日期','价格','备注'];
        let totalCost = 0;
        const tmp = function (props, k, res) {
            let result = '';
            if (k === 0) {
                result += ('<tr>'+
                        properties.map(tag => `<td>${tag}</td>`).join('')
                    + '</tr>');
            }
            result += ('<tr>'
                +
                    properties.map(name => {
                        const val = props[name];
                        switch(val.type) {
                            case 'title':
                            case 'rich_text':
                                if (val[val.type][0]) {
                                    if (val[val.type][0].href) {
                                        return `<td><a href=${val[val.type][0].href} target="_blank">${val[val.type][0].plain_text}</a></td>`
                                    } else {
                                        return `<td>${val[val.type][0].plain_text}</td>`
                                    }
                                }
                                return '<td></td>';
                            case 'date':
                                if (val[val.type]) {
                                    let start = val[val.type].start;
                                    let end = val[val.type].end;
                                    return `<td>${start || '?'}${end ? ' - ' + end : ''}</td>`;
                                }
                                return '<td></td>';
                            case 'number':
                                if (val[val.type]) {
                                    if (name === '价格' && !Number.isNaN(val[val.type])) {
                                        totalCost += Number(val[val.type]);
                                    }
                                    return `<td>${val[val.type]}</td>`;
                                }
                                return '<td></td>'
                            case 'multi_select':
                                if (val[val.type].length) {
                                        return '<td>' + 
                                            val[val.type].map(tag => {
                                                return `  <span class='label label-info'>${tag.name}</span>`;
                                            }).join('')
                                        + '</td>';
                                }
                                return '<td></td>';
                        }
                    }).join('')
                +   
                '</td>');
            if (k === res.length - 1) {
                result += ('<tr>'+
                        `<td colspan="999">总计有 ${res.length} 个软件，共花费 ￥${totalCost.toFixed(2)} 元</td>`
                    +'</tr>');
            }
            return result;
        };
        fetch('https://api.xheldon.com/api/getDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                properties: properties,
                databaseId: 'e828412b1852467b81b1a19507df3a8f',
                opt: {
                    sorts: [{
                        timestamp: 'created_time',
                        direction: 'ascending'
                    }]
                }
            })
        }).then(_ => {
            // Note: 错误信息也返回给 then，没有异常抛出
            _.json().then(res => {
                $('.data-loading').remove();
                if (Array.isArray(res)) {
                    $('.data-container').html(res.map(tmp.bind(res)).join(''));
                } else {
                    $('.data-container').html('Notion 服务器数据异常:', res.msg);
                }
            }).catch(err => {
                $('.data-container').html(`请求异常: 错误信息${err.message}`, err);
            });
        });
    };
</script>