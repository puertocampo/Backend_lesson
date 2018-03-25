var express = require('express'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware
//public以下の静的ファイルが呼び出されると勝手に内容を表示してくれる
app.use(express.static(__dirname+'/public'));
app.use(function(req, res, next) {
    console.log('my custom middleware');
    next();
});

app.get('/', function(req, res) {
    res.render('index', {title: 'EJS'});
});

app.param('id', function(req, res, next, id) {
    var users = ['taguchi', 'fkoji', 'dotinstall'];
    req.params.name = users[id];
    next();
});

app.get('/hello/:id', function(req, res) {
    res.send('hello '+req.params.name);
});
app.get('/bye/:id', function(req, res) {
    res.send('hello '+req.params.name);
});

/*
app.get('/users/:name?', function(req, res) {
    if (req.params.name) {
        res.send('hello, '+req.params.name);
    } else {
        res.send('hello, dareyanennomae!');
    }
        
});

app.get('/items/:id([0-9]+)', function(req, res) {
    res.send('item num: '+req.params.id);
});

app.get('/hello.txt', function(req, res) {
    res.sendfile(__dirname + '/public/hello.txt');
});*/

app.listen(3000);
console.log('server listening...');