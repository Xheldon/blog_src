/**
 * 此文件为了处理来自 Jekyll 的 Liquid 语法，基本跟 Jekyll 的 Ruby 插件类似
 */

function getValue(str) {
    const index = [...str].findIndex(v => {
        return v === '=';
    });
    return (index + 1) > str.length - 1 ? '' : str.slice(index + 1).trim();
}

hexo.extend.tag.register('render_caption', function(args) {
    const [caption, img] = args.map(getValue);
    return `<p caption='${caption}'><img src='${img}' alt='${caption}' title='${caption}'></p>`;
}, {
    ends: true,
});
hexo.extend.tag.register('render_bookmark', function(args, content) {
    const [url, title, img, yid, bid] = args.map(getValue);
    const firstChar = title ? title[0].toUpperCase() : '';
    if (yid) {
        return `<p class='embed-responsive embed-responsive-16by9'><iframe src='https://www.youtube.com/embed/${yid}?rel=0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></p>`
    } else if (bid) {
        return `<p class='embed-responsive embed-responsive-16by9' style='border-bottom: 1px solid #ddd;'><iframe src='//player.bilibili.com/player.html?bvid=${bid}&high_quality=1&as_wide=1' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen></iframe></p>`;
    }
    return `<p><a class='link-bookmark' href='${url}' target='_blank'><span data-bookmark-img='${img}' data-bookmark-title='${firstChar}'><img src='${img}'/></span><span><span> ${title}</span><span> ${content}</span><span> ${url}</span></span></a></p>`;
}, {
    ends: true,
});
hexo.extend.tag.register('render_video', function(args) {
    const [caption, img, suffix] = args.map(getValue);
    return `<p caption='${caption}'><video controls muted><source src='${img}' type='video/${suffix}' /></video></p>`;
}, {
    ends: true,
});
hexo.extend.tag.register('render_callout', function(args, content) {
    const [icon, color, bgcolor] = args.map(getValue);
    return `<p class='content-callout' style='background: ${bgcolor}; color: ${color};'><span class='content-callout-icon'>${icon}</span><span>${content}</span></p>`;
}, {
    ends: true,
});
hexo.extend.tag.register('render_quote', function(args, content) {
    const [color] = args.map(getValue);
    return `<blockquote style='border-color: ${color};color: ${color}'><p> ${content}</p></blockquote>`;
}, {
    ends: true,
});
