/**
 *  @author:  kenzyyang
 *  @date:  2019-4-7
 *  @desc:  用户表 表结构定义
 * */
const Sequelize = require('sequelize');
const {sequelize} = require('./model');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING(255),
        unique: true,
        comment: '用户账户名，保证唯一',
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '用户昵称',
        allowNull: false,
        defaultValue: 'default'
    },
    password: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        comment: '密码，仅存储密文'
    },
    email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
        comment: '用户邮箱'
    },
    createdTime: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: '创建时间',
    },
    updateTime: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: '更新时间'
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate: function (obj) {
            let now = Date.now();
            if (obj.isNewRecord) {
                obj.createdTime = now;
                obj.updateTime = now;
                obj.version = 0;
            } else {
                obj.updatedTime = Date.now();
            }
        }
    }
});
module.exports = User;
