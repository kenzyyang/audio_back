let config = {
    host: '127.0.0.1',
    userName: 'root',
    password: '19970601',
    database: 'audio'
};
// 根据环境参数决定使用哪个数据库配置
if (process.env.NODE_ENV === 'dev') {
    config = {
        host: '127.0.0.1',
        userName: 'root',
        password: '19970601',
        database: 'audio'
    };
} else if (process.env.NODE_ENV === 'prod') {
    config = {
        // :todo 远程服务器的本地
        host: '',
        userName: '',
        password: '',
        database: ''
    };
}
module.exports = {
    config
};