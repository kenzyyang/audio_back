/**
 *   @author:  kenzyyang
 *   @date:  2019-4-8
 *   @desc:  定义通用的请求返回结构
 * */
// 请求成功的通用结构
const success = (data, message = 'success') => {
    return {
        code: 0,
        message: message,
        data: data
    };
};

// 请求失败的通用结构，通常将代码异常传递到message中抛出
const error = (message = 'error') => {
    return {
        code: -1,
        message: message
    }
};

// 定义参数缺失的通用返回结构
const paramsMissing = () => {
    return {
        code: -2,
        message: '参数缺失,请根据接口文档查询必填参数是否传递'
    }
};

module.exports = {
    success,
    error,
    paramsMissing
};