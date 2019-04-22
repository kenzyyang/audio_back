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
    userLoginService,
    userChangeInfoService,
    getAllUserService,
    userChangePasswordService
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
                id: user.id,
                userName: user.userName,
                email: user.email,
                nickName: user.nickName,
                role: user.role,
                state: user.state
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
                id: user.id,
                userName: user.userName,
                email: user.email,
                nickName: user.nickName,
                role: user.role,
                state: user.state
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

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-10
 *   @desc:  用户修改信息接口,根据情况和权限决定，普通用户仅能修改自身信息，管理员只能修改普通用户信息，超级管理员无限制
 * */
const userChangeInfo = async (ctx, next) => {
    let userInfo = ctx.tokenInfo;
    const {id = '', nickName = '', email = ''} = ctx.request.body;
    if (!id || !nickName || !email) {
        ctx.response.body = paramsMissing();
        return;
    } else {
        const user = await userChangeInfoService(ctx.request.body, userInfo);
        if (typeof user === 'string') {
            ctx.response.body = error(user);
        } else {
            ctx.response.body = success(user);
        }
    }
    next();
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-22
 *   @desc:  获取用户信息的分页接口
 * */
const getAllUser = async (ctx, next) => {
    const {
        currentPage,
        currentSize
    } = ctx.request.body;
    if (isNaN(Number.parseInt(currentPage)) || isNaN(Number.parseInt(currentSize))) {
        ctx.response.body = paramsMissing();
    } else {
        const allUsers = await getAllUserService(currentPage, currentSize);
        allUsers.rows.forEach((item) => {
            // 逻辑层面过滤掉密码
            item.password = undefined;
        });
        const result = {
            count: allUsers.count,
            list: allUsers.rows
        };
        ctx.response.body = success(result);
    }
    next();
};

/**
 *   @author: kenzyyang
 *   @date:  2019-4-22
 *   @desc:  用户修改密码接口
 * */
const userChangePassword = async (ctx, next) => {
    let userInfo = ctx.tokenInfo;
    let {id, password, role} = ctx.request.body;
    if (isNaN(Number.parseInt(id)) || password === undefined || isNaN(Number.parseInt(role))) {
        ctx.response.body = paramsMissing();
        return;
    } else {
        let result = await userChangePasswordService(userInfo, ctx.request.body);
        if (typeof result === 'string') {
            ctx.response.body = error(result);
        } else {
            ctx.response.body = success(result);
        }
    }
    next();
};

module.exports = {
    userLogin,
    userLogout,
    userRegister,
    userChangeInfo,
    getAllUser,
    userChangePassword
};