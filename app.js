const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

// 文件上传的body解析
const koaBody = require('koa-body'); //解析上传文件的插件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 8 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

/**
 *   @author:  kenzyyang
 *   @date:  2019-4-8
 *   @desc:  通用请求拦截，校验用户是否登录
 * */
const {checkLogin} = require('./midware/checkLogin');
app.use(checkLogin);


// 加载路由中间件
const {router} = require('./router/index');
app.use(router.routes());

// 后端配置跨域
const cors = require('koa2-cors');

app.use((ctx, next)=>{
    console.log(`[koa]: [${ctx.method.toUpperCase()}] ${ctx.url}`);
    next();
});

app.use(cors({
    origin: 'http://localhost:8080',
    maxAge: 3600,
    credentials: true,
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.listen(3000, () => {
    console.log('[koa] service running in localhost:3000');
    console.log('[koa] env: dev')
});
