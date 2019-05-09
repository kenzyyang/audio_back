/**
 *   @author: kenzyyang
 *   @date:  2019-4-4
 *   @desc:  koa router总入口文件，通过该入口做路由分发
 * */
const Router = require('koa-router');
const {user} = require('./user');
const {audio} = require('./audio');
const {audioChapter} = require('./audioChapter');

let router = new Router();

router.use('/user', user.routes());
router.use('/audio', audio.routes());
router.use('/chapter', audioChapter.routes());

module.exports = {
    router
};