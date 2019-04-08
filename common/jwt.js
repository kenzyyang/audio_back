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
        expiresIn:  60 //秒到期时间
    });
    return token;
};

// jwt 认证函数，解析jwt，进行token认证
const jwtAuth = (data) => {

};

module.exports = {
    jwtAuth,
    jwtGenerator
};