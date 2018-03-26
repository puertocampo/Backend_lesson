var posts = [
    {title: 'title0', body: 'body0'},
    {title: 'title1', body: 'body1'},
    {title: 'title2', body: 'body2'},
];

// 他のファイルでも使える関数
exports.index = function(req, res) {
    res.render('posts/index', {posts: posts});
};

exports.show = function(req, res) {
    res.render('posts/show', {post: posts[req.params.id]});
};