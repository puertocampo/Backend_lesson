var http = require('http');
var settings = require('./settings.js'),
    fs = require('fs');
console.log(settings);
var server = http.createServer();
server.on('request', function (req, res) {
    fs.readFile(__dirname + '/public_html/hello.html', 'utf-8', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write(data);
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});
server.listen(settings.port, settings.host);//待ち受け状態の場所を指定
console.log('server listening ...');