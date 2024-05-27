/**
 * permalink 中的 name 不符合预期，对于 _posts/life/2015/xxx.md 来说，在文档中 :name 表示的是 xxx，但是实际是 life-2015-xxx
 */
hexo.extend.filter.register('post_permalink', function(data) {
    // 在这里修改 post.name 的值
    console.log('before:', data);
    const arr = data.split('/').filter(Boolean);
    const categories = arr[0];
    const name = arr[1];
    return `${categories}/${name.split('-').filter(Boolean).slice(3).join('-')}`;
  });

 /*  hexo.extend.filter.register('template_locals', function(locals){
    console.log('local:', [...arguments].slice(0, 2));
    locals.realfuckingname = locals.page
    return locals;
  }); */