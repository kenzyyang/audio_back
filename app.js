const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

const koaStatic = require('koa-static');

// 访问静态资源时,为其添加content-rang
// app.use(async (ctx, next) => {
//     const url = ctx.request.url;
//     await next();
//     console.log(url);
//     const reg = /\/audio\/([0-9]+).mp3/;
//     if (reg.test(url)) {
//         const id = reg.exec(url)[1];
//         console.log('正则匹配');
//         console.log(id);
//     }
// });

// 静态资源目录，用于存放图片等相关信息
const staticPath = './public';
app.use(koaStatic(path.join(__dirname, staticPath), {
    // 修改koa-static 源代码，将serHeaders 中的第一个参数改为 ctx.response。然后设置Accept-Ranges 使媒体类型能片段获取
    setHeaders: (response, path, stats) => {
        response.set('Accept-Ranges','bytes');
    }
}));

// // 使用mime模块请求静态资源
// const mime = require('mime');
// app.use(async (ctx, next) => {
//     const url = ctx.request.url;
// // 1、获取用户请求的路径 req.url
//     // 2、获取public目录的完整路径
//     var publicDir = path.join(__dirname, 'public');
//     // 3、根据public路径 和 用户请求的路径 计算出用户请求的静态资源的完整路径
//     var filename = path.join(publicDir, url);
//     console.log(filename);
//     // 4、根据文件的完整路径去读取该文件，如果读取到了，就把文件中数据返回给用户，如果读取不到则返回404
//     try {
//         const file = fs.createReadStream(filename);
//         console.log('文件读取');
//         console.log(file);
//         console.log(mime.getType(filename));
//         console.log(ctx.response.header);
//         ctx.response.headers['Content-Type'] = mime.getType(filename);
//         ctx.response.body = file;
//
//     } catch (err) {
//         console.log(err);
//         ctx.response.body = {
//             code: -1,
//             message: '请求资源不存在'
//         }
//     }
//     next();
// });

// 文件上传的body解析
const koaBody = require('koa-body'); //解析上传文件的插件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 1024 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
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

app.use((ctx, next) => {
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
