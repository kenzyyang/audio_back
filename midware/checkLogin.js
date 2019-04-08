/**
 *  @author:  kenzyyang
 *  @date:  2019-4-8
 *  @desc:  登录验证相关的处理函数
 * */
const excludeUrl = ['/user/userLogin','/user/userRegister'];

const checkLogin = async (ctx,next) => {
    const url = ctx.url;
    // 需要被拦截
    if(excludeUrl.indexOf(url) === -1){
        console.log('检查是否登录');
    }
    await next();
};

module.exports = {
    checkLogin
};