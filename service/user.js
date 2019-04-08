/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  user表的 service层，用于处理复杂的业务逻辑，减轻controller层的代码量
 * */
const User = require('../models/user');

// 注册
const userRegisterService = async (data) => {
    const result = await userAdd(data);
    if (result.code === 0) {
        return result.data;
    } else {
        // 如果报错，将异常信息拼接之后返回到前端
        let error = '';
        for (let i in result.data['errors']) {
            error += result.data['errors'][i].message;
        }
        return error;
    }
};

// 登录
const userLoginService = async (data) => {
    const result = await userQuery(data);
    if (result.code === 0) {
        if (result.data === null) {
            return '用户名不存在';
        } else if (data.password !== result.data.password) {
            return '密码错误';
        } else {
            return result.data;
        }
        return result.data;
    } else {
        // 如果报错，将异常信息拼接之后返回到前端
        let error = '';
        for (let i in result.data['errors']) {
            error += result.data['errors'][i].message;
        }
        return error;
    }
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  数据库原操作，增删改查
 * */
const userAdd = async (data) => {
    let result = null;
    try {
        const user = await User.create({
            userName: data.userName,
            nickName: data.nickName,
            password: data.password,
            email: data.email
        });
        result = {
            code: 0,
            data: user
        };
    } catch (err) {
        result = {
            code: -1,
            data: err
        };
    }
    return result;
};

const userQuery = async (data) => {
    let result = null;
    try {
        const user = await User.findOne({
            where: {
                userName: data.userName
            }
        });
        result = {
            code: 0,
            data: user
        };
    } catch (err) {
        result = {
            code: -1,
            data: err
        };
    }
    return result;
};


module.exports = {
    userRegisterService,
    userLoginService
};
