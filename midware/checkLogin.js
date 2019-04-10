/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  登录验证相关的处理函数
 * */
const excludeUrl = ['/user/userLogin', '/user/userRegister'];
const {jwtAuth} = require('../common/jwt');
const {success, notLogin} = require('../common/response');

const checkLogin = async (ctx, next) => {
    const url = ctx.url;
    // 需要被拦截
    if (excludeUrl.indexOf(url) === -1) {
        const token = ctx.request.headers['authorization'];
        const result = jwtAuth(token);
        if (typeof result === 'string') {
            ctx.response.body = notLogin(result);
            return;
        } else {
            // 将解析后的信息绑定到ctx 的 tokenInfo 中，避免后续多余的token解码操作
            ctx.tokenInfo = result;
        }
    }
    await next();
};

module.exports = {
    checkLogin
};