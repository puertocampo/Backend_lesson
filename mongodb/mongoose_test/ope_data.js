var model = require('./model');
var Sake = model.Sake;
var SakeType = model.SakeType;
var Temperature = model.Temperature;

var kuheiji = new Sake({
    brand: '醸し九平次',
    type: 9,
    impressions: [
        { temperature: 7, impression: 'うまい' },
        { temperature: 10, impression: 'ううう' }
    ]
});
kuheiji.save(function (err) {
    if (err) throw err;
});

var jokigen = new Sake({
    brand: '上喜元',
    type: 9,
    impressions: [
        { temperature: 7, impression: 'フルーティ' },
        { temperature: 9, impression: 'フレッシュ' }
    ]
});
jokigen.save(function (err) {
    if (err) { throw err; }
});

// 検索
Sake.find({ brand: '醸し九平次' }, function (err, result) {// brand: '醸し九平次' 
    if (err) { throw err; }
    console.log(result.brand);
    console.log(result.type);
})

Sake.findOne({ type: 9 }, function (err, result) {
    if (err) { throw err; }
    console.log(result.brand);  // 登録順の関係でこちらも'醸し人九平次'が出力される
    console.log(result.type);   // '9'が出力される
});

// Population
// Sake.find({ brand: '醸し人九平次' })
//     .populate('type impressions.temperature')
//     .exec(function (err, result) {
//         if (err) { throw err; }
//         console.log(result[0].type.type);  // '純米大吟醸酒'が出力される
//         console.log(result[0].impressions[0].temperature.temperature);  // '常温'が出力される
//     });

Sake.update(
    { brand: '醸し九平次' },
    { $set: { brand: '獺祭' } },
    function (err) {
        if (err) throw err;
    }
);

Sake.find({}, function (err, result) {
    if (err) throw err;
    console.log(result);
})