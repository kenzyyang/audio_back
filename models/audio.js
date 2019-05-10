/**
 *  @author:  kenzyyang
 *  @date:  2019-4-26
 *  @desc:  有声书表 表结构定义
 * */
const Sequelize = require('sequelize');
const {sequelize} = require('./model');


const User = sequelize.define('audio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    audioName: {
        type: Sequelize.STRING(255),
        unique: true,
        comment: '有声书名称，保证唯一',
        allowNull: false
    },
    audioAbstract: {
        type: Sequelize.STRING(500),
        comment: '有声书简介和摘要',
        allowNull: false
    },
    audioType: {
        type: Sequelize.TINYINT,
        comment: '有声书类型, 0 为中文  1  为英文，后续从这里扩展',
        allowNull: false,
        defaultValue: 0
    },
    createUser: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '创建人用户名'
    },
    coverPath: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '有声书封面图片路径'
    },
    createdTime: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: '创建时间',
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate: function (obj) {
            let now = Date.now();
            if (obj.isNewRecord) {
                obj.createdTime = now;
            }
        }
    }
});
module.exports = User;
