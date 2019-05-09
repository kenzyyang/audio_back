/**
 *  @author:  kenzyyang
 *  @date:  2019-4-26
 *  @desc:  有声书章节表
 * */
const Sequelize = require('sequelize');
const {sequelize} = require('./model');


const User = sequelize.define('audioChapter', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    belongedAudio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '属于哪个有声书'
    },
    chapter: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '有声书 章序号'
    },
    audioPath: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
        comment: '有声书音频路径'
    },
    createUser: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '创建人'
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
