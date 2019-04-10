/**
 *   @author:  kenzyyang
 *   @date:  2019-4-8
 *   @desc:  生成jwt相关的函数封装
 * */
const jwt = require('jsonwebtoken');

// :todo jwt 私钥, 应该写在配置文件中，然后去读取。暂时先这样
const secret = 'kenzyyang1997';

// jwt生成函数，生成jwt token
const jwtGenerator = (data) => {
    const token = jwt.sign(data, secret, {
        expiresIn: 7200 //到期时间 两个小时，单位 秒
    });
    return token;
};

// jwt 认证函数，解析jwt，进行token认证
const jwtAuth = (data) => {
    const result = jwt.decode(data);
    if (result === null) {
        return '认证失败';
    } else {
        const time = new Date - 0;
        if (result.exp * 1000 > time) {
            return result;
        } else {
            return '认证已过期'
        }
    }
};

module.exports = {
    jwtAuth,
    jwtGenerator
};