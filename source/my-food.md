---
layout: page
description: 推荐和避坑系列
hide-in-nav: true
header-img: "img/book-list-bg.png"
permalink: /my-food/
multilingual: false
header-mask: 0.4
fullcontent: true
title: 美食推荐&避坑
lastUpdateTime: 2022-04-01 13:19:59 +0800
---

<style>
    #container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "微软雅黑";
        height: 75vh;
    }
</style>
<blockquote>
    <ol>
        <li>本文涵盖了在本人吃过的美食，推荐给大家，用<b style="color: #73e261;"> 绿色 </b>标出；也有去网红店吃过后的避坑建议，也在此列出，用<b style="color: #fd9696;"> 红色 </b>标出，供大家避坑。</li>
        <li>点击下方店名可以直接在地图显示出来，点击地图中店名的定位 icon 后可以查看详细，点击下方的「立即出发」可以调起百度地图（部分地点调起后无法定位，这个是百度地图的锅）。</li>
        <li>Notion 数据源 <a href="https://xheldon.notion.site/80a16c2032ee409087a9b41d688f9e4c?v=80b13d0228a348dbbb00586dca03ce28" target="_blank">点击这里查看</a>。</li>
        <li>其他说明: <div>因为每个人的口味不一样，以及吃饭时候的肚子饥饿成程度不一样，因此对一种食物的好吃与否的评价标准也是非常主观的，这里只做推荐，不打包票，酌情尝试。</div><div>又：本人口味偏咸，可以吃微辣和中辣，但吃不了很辣非常辣变态辣的食物。</div></li>
    </ol>
</blockquote>
<div class="data-loading"><span></span><span></span><span></span><span></span><span></span></div>
<ul id="container"></ul>
<hr />
<div class="list-container"></div>
<hr />
<script src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=m66EjYkRV41StonGBlN3G0TAgP6kMumj"></script>
<script>
    const properties = ['名称', '地点', '菜系', '坐标', '介绍', '图片', '推荐']
    fetch('https://api.xheldon.com/api/getDatabase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            properties,
            databaseId: '80a16c2032ee409087a9b41d688f9e4c',
            opt: {
                sorts: [{
                    timestamp: 'created_time',
                    direction: 'ascending',
                }]
            }
        })
    }).then(_ => {
        _.json().then(res => {
            // Note: 根据数据，生成 json
            $('.data-loading').remove();
            if (Array.isArray(res)) {
                const data = [];
                // Note: Notion 直接以 property 当做 key，它都不怕我怕啥！
                const posList = [];
                res.forEach(({名称, 地点, 菜系, 坐标, 介绍, 图片, 推荐}) => {
                    // Note: 检查数据有效性
                    if (名称 && 名称.type && 名称[名称.type] && 名称[名称.type][0] && 名称[名称.type][0].plain_text.trim()
                        && 地点 && 地点.type && 地点[地点.type] && 地点[地点.type].name && 地点[地点.type].name.trim()
                        && 菜系 && 菜系.type && 菜系[菜系.type] && 菜系[菜系.type].name && 菜系[菜系.type].name.trim()
                        && 坐标 && 坐标.type && 坐标[坐标.type] && 坐标[坐标.type][0] && 坐标[坐标.type][0].plain_text && 坐标[坐标.type][0].plain_text.trim()
                        && 介绍 && 介绍.type && 介绍[介绍.type] && 介绍[介绍.type][0] && 介绍[介绍.type][0].plain_text.trim()
                        && 图片 && 图片.type && 图片[图片.type] && 图片[图片.type].trim()
                        && 推荐 && 推荐.type && 推荐[推荐.type] && 推荐[推荐.type].name && 推荐[推荐.type].name.trim()
                    ) {
                        const point = 坐标[坐标.type][0].plain_text.trim().split(',').map(p => Number(p.trim()))
                        const id = 地点[地点.type].name;
                        if (!posList.includes(id)) {
                            posList.push(id);
                        }
                        data.push({
                            名称: 名称[名称.type][0].plain_text,
                            地点: 地点[地点.type].name,
                            菜系: 菜系[菜系.type].name,
                            坐标: point,
                            介绍: 介绍[介绍.type][0].plain_text,
                            图片: 图片[图片.type],
                            推荐: 推荐[推荐.type].name
                        });
                    }
                });
                // Note: 新建一个以地点为分类的容器
                posList.forEach(p => {
                    const li = document.createElement('li');
                    const ul = document.createElement('ul');
                    ul.id = `id-${p}`;
                    li.innerHTML = `<b style="font-size: 18px;">${p}</b>`;
                    li.appendChild(ul);
                    document.querySelector('.list-container').appendChild(li);

                });
                console.log('data:', data);
                var map = new BMapGL.Map('container');
                // Note: 禁止缩放，不然滑动页面容易乱滚
                var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
                map.addControl(scaleCtrl);
                var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
                map.addControl(zoomCtrl);
                var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
                map.addControl(navi3DCtrl);
                var cr = new BMapGL.CopyrightControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: new BMapGL.Size(20, 20)
                });   //设置版权控件位置
                map.addControl(cr); //添加版权控件
                var bs = map.getBounds();   //返回地图可视区域
                cr.addCopyright({
                    id: 1, 
                    content: "<a href='https://twitter.com/_Xheldon' target='_blank' style='font-size:18px;color:#337ab7;'><b>@_Xheldon</b></a>", 
                    bounds: bs
                });
                const pointArr = [];
                data.forEach(item => {
                    pointArr.push(new BMapGL.Point(item.坐标[0], item.坐标[1]));
                    var marker = new BMapGL.Marker(new BMapGL.Point(item.坐标[0], item.坐标[1]));
                    map.addOverlay(marker);
                    const isGood = item.推荐 === '是';
                    var content = `
                    <div>
                        <div style="display: flex; justify-content: space-between;overflow: hidden;">
                            <div style="overflow: hidden; max-width: 200px; max-height: 90px; margin-bottom: 10px;">
                                <span title="${item.介绍}" style="text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;line-height: 1.3; ">
                                    ${item.介绍}
                                </span>
                            </div>
                            <img id="img-${item.名称}" style='max-height: 90px;max-width: 150px; height: auto; margin: 0 5px 10px 5px;' src='${item.图片}' />
                        </div>`;
                    var infoWindow = new BMapGL.InfoWindow(content, {
                        title: `<div style="overflow: hidden;text-overflow: ellipsis;"><b ${isGood ? 'style="color: #73e261;">👍🏻 推荐' : 'style="color: #fd9696;">👎🏻 不推荐'}</b> ${item.名称}@${item.菜系}</b><div>`
                    });
                    marker.addEventListener('click', function () {
                        this.openInfoWindow(infoWindow);
                        document.getElementById(`img-${item.名称}`).onload = function () {
                            // Note: 防止在网速较慢时生成的信息框高度比图片总高度小，导致图片部分被隐藏
                            infoWindow.redraw();
                        };
                    });
                    const li = document.createElement('li');
                    const div = document.createElement('div');
                    const link = document.createElement('a');
                    link.href = 'javascript:void(0);';
                    link.innerHTML = `<b ${isGood ? 'style="color: #73e261;">👍🏻 推荐' : 'style="color: #fd9696;">👎🏻 不推荐'}</b> <b> ${item.名称}@${item.菜系}</b>`;
                    div.appendChild(link);
                    if (isGood) {
                        const link2 = document.createElement('a');
                        link2.style.marginLeft = '20px';
                        link2.href = `http://api.map.baidu.com/marker?location=${item.坐标[1]},${item.坐标[0]}&title=${item.名称}@${item.菜系}&coord_type=bd09ll&content=${item.介绍}&output=html&src=webapp.xheldon.xblog`;
                        link2.target = '_blank';
                        link2.innerHTML = `<b>👉🏻立即出发👈🏻</b>`;
                        div.appendChild(link2);
                    }
                    const p = document.createElement('p');
                    p.style.margin = '0';
                    p.innerHTML = `<b>评价:</b> ${item.介绍}`;
                    div.appendChild(p);
                    link.onclick = function () {
                        map.centerAndZoom(new BMapGL.Point(item.坐标[0], item.坐标[1]), 18);
                    };
                    li.appendChild(div);
                    document.querySelector(`#id-${item.地点}`).appendChild(li);
                });
                map.setViewport(pointArr, {
                    margins: [50, 50, 50, 50],
                });
            } else {
                $('#container').html('Notion 服务器数据异常:', res.msg);
            }
        });
    })
</script>
