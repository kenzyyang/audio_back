/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  章节相关逻辑
 * */
const Chapter = require('../models/audioChapter');
const fs = require('fs');
const path = require('path');

/**
 *  @author: kenzyyang
 *  @date:  2019-5-9
 *  @desc:  新增章节接口，讲录音上传独立出来
 * */
const chapterAddService = async (userInfo, data) => {
    if (userInfo.role === 2) {
        return '暂无权限操作';
    } else {
        const params = {
            belongedAudio: data.belongedAudio,
            chapter: data.chapter,
            createUser: userInfo.userName
        };
        let result = await chapterAdd(params);
        if (result.code === 0) {
            return result.data;

        } else {
            return result.message.toString();
        }
    }
};

/**
 *  @author: kenzyyang
 *  @date:  2019-5-9
 *  @desc:  录音上传接口
 * */
const chapterAddUploadService = async (userInfo, data) => {
    if (userInfo.role === 2) {
        return '暂无权限操作';
    } else {
        const result = await chapterAddUpload(data.id, data.audio);
        if (result.code === 0) {
            return result.data;
        } else {
            return result.message.toString();
        }
    }
};

/**
 *   @author:  kenzyyang
 *   @date:  2019-5-9
 *   @desc:  章节删除接口
 * */
const chapterDeleteService = async (userInfo, id) => {
    if (userInfo.role === 2) {
        return '暂无权限操作';
    } else {
        let result = await chapterDelete(id);
        if (result.code === 0) {
            return result.data;
        } else {
            return result.message.toString();
        }
    }
};


const chapterAdd = async (data) => {
    const {
        belongedAudio = '',
        chapter = '',
        createUser = ''
    } = data;
    const createTime = Date.now();
    let result = null;
    try {
        const chapters = await Chapter.create({
            belongedAudio,
            chapter,
            createUser,
            createTime,
            audioPath: 'default' + createTime
        });
        result = {
            code: 0,
            data: chapters
        }
    } catch (err) {
        result = {
            code: -1,
            message: err
        }
    }
    return result;
};

const chapterAddUpload = async (id, audio) => {
    let result = null;
    try {
        let chapter = await Chapter.findOne({
            where: {
                id: id
            }
        });
        if (chapter === null) {
            result = {
                code: -1,
                message: '该有声书不存在'
            }
        } else {
            // 创建可读流
            const reader = fs.createReadStream(audio.path);
            let filePath = path.join(__dirname, '../public/audio/') + `${id}.mp3`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            // 更改数据库内容
            chapter.audioPath = /audio/ + id + '.mp3';
            await chapter.save();
            result = {
                code: 0,
                data: chapter
            };
        }
    } catch (err) {
        result = {
            code: -1,
            message: err
        };
    }
    return result;
};

const chapterDelete = async (id) => {
    let result = null;
    try {
        let chapter = await Chapter.findOne({
            where: {
                id: id
            }
        });
        if (chapter !== null) {
            await chapter.destroy();
            // 删除录音
            let filePath = path.join(__dirname, '../public/audio/') + `${chapter.id}.mp3`;
            fs.unlinkSync(filePath);
            result = {
                code: 0,
                data: chapter
            };
        } else {
            result = {
                code: -1,
                message: '记录不存在'
            };
        }
    } catch (err) {
        result = {
            code: -1,
            message: err
        };
    }
    return result;
};

module.exports = {
    chapterAddService,
    chapterAddUploadService,
    chapterDeleteService
};