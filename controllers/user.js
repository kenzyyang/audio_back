/**
 *   @author:  kenzyyang
 *   @date:  2019-4-4
 *   @desc:  用户操作相关的controller
 * */

/**
 *   @date: 2019-4-4
 *   @desc: 用户登录接口
 *   @method: POST
 *   @param: userName  string  用户名
 *   @param: password:  string  密码
 * */
const userLogin = async (ctx,next) => {
    const data = ctx.request.body;
    console.log(data);
    ctx.response.body = data;
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-4
 *   @desc:  用户登出接口
 *   @param:  userName  string  用户名
 * */
const userLogout = async (ctx,next) => {
    ctx.body = 'hello 这是用户登出接口';
};

module.exports = {
    userLogin,
    userLogout
};