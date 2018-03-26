var express = require('express'),
    app = express(),
    post = require('./routes/post');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(function(err, req, res, next){
    res.send(err.message);
});
// app.use(express.methodOverride());

//csrf対策
// app.use(express.cookieParser());
// app.use(express.session({secret: '3948sfGUE83D'}));
// app.use(express.csrf());
// app.use(function(req, res, next) {
//     res.locals.csrftoken = req.csrfToken();
//     next();
// })

// routing
app.get('/', post.index);
app.get('/posts/:id([0-9])+', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

app.listen(3000);
console.log('server listening...');