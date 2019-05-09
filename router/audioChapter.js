/**
 *   @author:  kenzyang
 *   @date:  2019-4-26
 *   @desc:  audio 章节相关接口
 * */
const Router = require('koa-router');
const Chapter = require('../controllers/audioChapter');
let audioChapter = new Router();

audioChapter.post('/chapterAdd', Chapter.chapterAdd);
audioChapter.post('/chapterAddUpload', Chapter.chapterAudioUpload);
audioChapter.post('/chapterDelete', Chapter.chapterDelete);
audioChapter.post('/chapterGetAllById', Chapter.audioGetAllById);
// 通用拦截 get 请求
audioChapter.get('*', async (ctx) => {
    ctx.body = '仅支持post请求';
});

module.exports = {
    audioChapter
};
