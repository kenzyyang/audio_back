const Audio = require('../models/audio');
const fs = require('fs');
const path = require('path');

const audioAddService = async (userInfo, data) => {
    if (userInfo.role === 2) {
        return '仅管理员可创建有声书,暂无权限操作';
    } else {
        const params = {
            audioName: data.audioName,
            audioType: data.audioType,
            cover: data.cover,
            createUser: userInfo.userName,
        };
        let result = await audioAdd(params);
        if (result.code === 0) {
            return result.data;
        } else {
            // 如果报错，将异常信息拼接之后返回到前端
            let error = '';
            for (let i in result.data['errors']) {
                error += result.data['errors'][i].message;
            }
            return error;
        }
    }
};

const audioGetAllService = async () => {
    let result = await audioGetAll();
    if (result.code === 0) {
        return result.data;
    } else {
        // 如果报错，将异常信息拼接之后返回到前端
        let error = '';
        for (let i in result.data['errors']) {
            error += result.data['errors'][i].message;
        }
        return error;
    }
};


// 数据库操作
const audioAdd = async (data) => {
    let result = null;
    try {
        let audio = await Audio.create({
            audioName: data.audioName,
            audioType: data.audioType,
            coverPath: 'default',
            createUser: data.createUser,
        });
        // 创建可读流
        const reader = fs.createReadStream(data.cover.path);
        let filePath = path.join(__dirname, '../image/') + `/${audio.id}.${data.cover.type.split('/')[1]}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        result = {
            code: 0,
            data: audio
        };
    } catch (err) {
        result = {
            code: -1,
            data: err
        };
    }
    return result;

};

const audioGetAll = async () => {
    let result = null;
    try {
        let audios = await Audio.findAll();
        result = {
            code: 0,
            data: audios
        };
    } catch (err) {
        result = {
            code: -1,
            data: err
        }
    }
    return result;
};


module.exports = {
    audioAddService,
    audioGetAllService
};