const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

// 加载body 解析器插件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 加载路由中间件
const {router} = require('./router/index');
app.use(router.routes());

app.listen(3000, () => {
    console.log('[koa] service running in localhost:3000');
});
