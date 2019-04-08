/**
 *   @author:  kenzyyang
 *   @date:  2019-4-8
 *   @desc:  数据库初始化工具,将 models 下定义数据表的
 * */
const {sequelize} = require('../models/model');
//  导入所有定义在models下面的表
const User = require('../models/user');

// 执行数据库初始化表
sequelize.sync();