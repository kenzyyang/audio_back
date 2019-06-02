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
audio.post('/audioDelete', Audio.audioDelete);
audio.post('/audioChange', Audio.audioChange);
audio.post('/audioGetOne', Audio.audioGetOne);
audio.post('/audioGetAllByType', Audio.audioGetAllByType);
audio.post('/audioGetAllByUserName', Audio.audioGetAllByUserName);
audio.post('/audioGetType', async (ctx, next) => {
    ctx.response.body = {
        code: 0,
        data: {
            typeList: [
                {
                    value: 1,
                    label: '英文书'
                },
                {
                    value: 2,
                    label: '中文书'
                }
            ]
        }
    };
    next();
});

module.exports = {
    audio
};
