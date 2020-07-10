const api=require('./api');
const gacha=require('./gacha');

console.log("机器人开始运行");
gacha.main()
api.start();