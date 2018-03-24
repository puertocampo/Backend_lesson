var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');
MongoClient.connect('mongodb://'+ settings.host+'/'+settings.db, function(err, client) {
    if (err) { return console.dir(err); }
    const db = client.db(settings.db);
    console.log('connected to db');
    db.collection('users', function(err, collection) {
        var docs = [
            {name: 'taguchi', score: 40},
            {name: 'ishikawa', score: 80},
            {name: 'tsuno', score: 60}
        ];
        collection.insert(docs, function(err, result) {
            console.dir(result);
        });
        /*
        collection.find({name: 'tsuno'}).toArray(function(err, items) {
            console.log('items')
            console.log(items);
        });
        */
       var stream = collection.find({name: 'ishikawa'}).stream(); //配列要素取り出し 結果が大量のとき
       stream.on('data', function(item) {
           console.log('data')
           console.log(item);
       });
       stream.on('end', function() {
           console.log('finished.');
       });
    });
});