/**
 *   @author:  kenzyang
 *   @date:  2019-4-4
 *   @desc:  用于 user 相关的路由,包括登录注册相关的接口
 * */
const Router = require('koa-router');
const User = require('../controller/user');
let user = new Router();

// 通用拦截 get 请求
user.get('*',async (ctx)=>{
    ctx.body = '仅支持post请求';
});
user.post('/userLogin', User.userLogin);
user.post('/userLogout', User.userLogout);

module.exports = {
    user
};
