const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

// 加载body 解析器插件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

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
