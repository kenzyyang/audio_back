/**
 *  @author:  kenzyyang
 *  @date:  2019-4-7
 *  @desc:  用户表 表结构定义
 * */
const Sequelize = require('sequelize');
const {sequelize} = require('./model');
const {USER} = require('../config/rbac');


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
    },
    /**
     *  @author:  kenzyyang
     *  @date:  2019-4-10
     *  @desc:  添加角色属性，通过角色属性进行权限控制,目前操作较少，使用rbac模型。
     *          添加用户注销功能，保留用户信息，但不再使用
     * */
    role: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: USER,
        comment: '用户权限设置，默认创建的用户为普通用户'
    },
    state: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '用户在读状态，0为在读，1为非在读，即账户注销'
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate: function (obj) {
            let now = Date.now();
            if (obj.isNewRecord) {
                obj.createdTime = now;
                obj.updateTime = now;
            } else {
                obj.updatedTime = Date.now();
            }
        }
    }
});
module.exports = User;
