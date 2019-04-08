/**
 *   @author:  kenzyyang
 *   @date:  2019-4-4
 *   @desc:  用户操作相关的controller
 * */
const {
    success,
    error,
    paramsMissing
} = require('../common/response');
const {
    userRegisterService
} = require('../service/user');

/**
 *   @author:  kenzyyang
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

/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  用户注册接口, 密码对于后端来说为纯文本，不做加解密，在前端加密后传输，后端保留解密手段。
 * */
const userRegister = async (ctx, next) => {
    const {userName,password,email,nickName} = ctx.request.body;
    if(userName === undefined || password === undefined || email === undefined || nickName === undefined){
        ctx.response.body = paramsMissing();
    }
    else{
        const data = {
            userName,
            password,
            email,
            nickName
        };
        const user = await userRegisterService(data);
        if(typeof user === 'string'){
            ctx.response.body = error(user);
        }
        else{
            ctx.response.body = success(user);
        }
    }
};

module.exports = {
    userLogin,
    userLogout,
    userRegister
};