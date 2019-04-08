/**
 *  @author:  kenzyyang
 *  @date:  2019-4-7
 *  @desc:  定义通用的数据库入口，具体的表结构从各个子文件中定义之后导出，通过该文件进行数据库初始化
 * */
const Sequelize = require('sequelize');
const {config} = require('../config/db');

const sequelize = new Sequelize(config.database, config.userName, config.password, {
    host: config.host,
    dialect: 'mysql'
});

module.exports = {
    sequelize
};