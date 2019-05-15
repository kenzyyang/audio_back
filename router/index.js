/**
 *   @author: kenzyyang
 *   @date:  2019-4-4
 *   @desc:  koa router总入口文件，通过该入口做路由分发
 * */
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const {user} = require('./user');
const {audio} = require('./audio');
const {audioChapter} = require('./audioChapter');

let router = new Router();

// 获取页面的路由
router.get('/', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.join(__dirname, './demos/template.html'));
});

router.use('/user', user.routes());
router.use('/audio', audio.routes());
router.use('/chapter', audioChapter.routes());

module.exports = {
    router
};