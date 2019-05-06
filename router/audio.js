/**
 *   @author:  kenzyang
 *   @date:  2019-4-26
 *   @desc:  audio相关接口
 * */
const Router = require('koa-router');
const Audio = require('../controllers/audio');
let audio = new Router();

// 通用拦截 get 请求
audio.get('*', async (ctx) => {
    ctx.body = '仅支持post请求';
});
audio.post('/audioAdd', Audio.audioAdd);
audio.post('/audioGetAll', Audio.audioGetAll);
audio.post('/test', async (ctx) => {
    const result = ctx.request.headers['authorization'];
    console.log('进入测试接口');

});

module.exports = {
    audio
};
