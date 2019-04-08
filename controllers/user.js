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
    userRegisterService,
    userLoginService
} = require('../service/user');
const {jwtGenerator} = require('../common/jwt');


/**
 *   @author:  kenzyyang
 *   @date: 2019-4-4
 *   @desc: 用户登录接口
 *   @method: POST
 *   @param: userName  string  用户名
 *   @param: password:  string  密码
 * */
const userLogin = async (ctx, next) => {
    const data = ctx.request.body;
    const {userName, password} = data;
    if (userName === undefined || password === undefined) {
        ctx.response.body = paramsMissing();
    } else {
        const user = await userLoginService(data);
        if (typeof user === 'string') {
            ctx.response.body = error(user);
        } else {
            let token = jwtGenerator({
                userName: user.userName,
                email: user.email,
                nickName: user.nickName
            });
            let result = {
                token: token,
                user: user
            };
            ctx.response.body = success(result, '登陆成功');
        }
    }
    next();
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-4
 *   @desc:  用户登出接口
 *   @param:  userName  string  用户名
 * */
const userLogout = async (ctx, next) => {
    ctx.body = 'hello 这是用户登出接口';
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  用户注册接口, 密码对于后端来说为纯文本，不做加解密，在前端加密后传输，后端保留解密手段。
 * */
const userRegister = async (ctx, next) => {
    const {userName, password, email, nickName} = ctx.request.body;
    if (userName === undefined || password === undefined || email === undefined || nickName === undefined) {
        ctx.response.body = paramsMissing();
    } else {
        const data = {
            userName,
            password,
            email,
            nickName
        };
        const user = await userRegisterService(data);
        if (typeof user === 'string') {
            ctx.response.body = error(user);
        } else {
            // 注册成功, 准备生成jwt，返回给前端
            const token = jwtGenerator({
                userName: user.userName,
                email: user.email,
                nickName: user.nickName
            });
            const result = {
                token: token,
                user: user
            };
            ctx.response.body = success(result);
        }
    }
    next();
};

module.exports = {
    userLogin,
    userLogout,
    userRegister
};