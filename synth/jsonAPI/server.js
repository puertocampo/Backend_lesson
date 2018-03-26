// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// DBへの接続
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jsonAPI');

// モデルの宣言
var User = require('./app/models/user');

// POSTでdataを受け取る為の記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3000番を指定
var port = process.env.PORT || 3000;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
})

// 正しく実行できるか右記にアクセスしてテストする(GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

// /usersというルートを作成する
router.route('/users')

    // ユーザの作成 (POST http://localhost:3000/api/users)
    .post(function (req, res) {
        // 新しいユーザのモデルを作成する
        var user = new User();

        //  ユーザの各カラムの情報を取得する．
        user.twitter_id = req.body.twitter_id;
        user.name = req.body.name;
        user.age = req.body.age;

        // ユーザ情報をセーブする
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User created!' });
        });
    })

    // 全てのユーザ一覧を取得 (GET http://localhost:8080/api/users)
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

// /users/user_idというルートを作成する
router.route('/users/:user_id')

    // 一人のユーザの情報を取得 (GET http://localhost:3000/api/users/:user_id)
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })

    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.send(err);
            }
            user.twitter_id = req.body.twitter_id;
            user.name = req.body.name;
            user.age = req.body.age;

            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'User updated!' });
            });
        });
    })

    .delete(function(req, res) {
        User.remove({
            twitter_id: req.params.user_id
        }, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted'});
        });
    })

// ルーティング登録
app.use('/api', router);

// サーバ起動
app.listen(port);
console.log('listen on port ' + port);