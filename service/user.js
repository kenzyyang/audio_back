/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  user表的 service层，用于处理复杂的业务逻辑，减轻controller层的代码量
 * */
const User = require('../models/user');

const userRegisterService = async (data) => {
    const result = await userAdd(data);
    if (result.code === 0) {
        return result.data;
    }
    else {
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
    try {
        const user = await User.create({
            userName: data.userName,
            nickName: data.nickName,
            password: data.password,
            email: data.email
        });
        return {
            code: 0,
            data: user
        };
    } catch (err) {
        return {
            code: -1,
            data: err
        }
    }
};

module.exports = {
    userRegisterService
};
