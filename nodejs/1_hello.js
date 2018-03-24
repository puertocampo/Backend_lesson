// console.log('hello world');

// non blocking
//setTimeoutが終わったらfunction()を呼び出す
//その間次の命令'world'はブロックしない
setTimeout(function() {
    console.log('hello');
}, 1000);
console.log('world');

// blocking
var start = new Date().getTime();
while (new Date().getTime() < start + 1000);
console.log('world');