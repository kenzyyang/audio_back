/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  章节相关controllet
 * */

const {
    success,
    error,
    paramsMissing
} = require('../common/response');
const {
    chapterAddService,
    chapterAddUploadService,
    chapterDeleteService,
    chapterGetAllByIdService
} = require('../service/audioChapter');

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  新增章节接口
 *  @method:  POST
 *  @param:  belongedAudio  number  所属有声书
 *  @param:  chapter  number   序号，排序用
 * */
const chapterAdd = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        belongedAudio = '',
        chapter = '',
    } = ctx.request.body;
    if (belongedAudio === '' || chapter === '' || isNaN(Number.parseInt(belongedAudio)) || isNaN(Number.parseInt(chapter))) {
        ctx.response.body = paramsMissing();
    } else {
        const params = {
            belongedAudio,
            chapter
        };
        const chapters = await chapterAddService(userInfo, params);
        if (typeof chapters === 'string') {
            ctx.response.body = error(chapters);
        } else {
            ctx.response.body = success(chapters);
        }
    }
    next();
};


/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  单独的章节录音上传接口
 *  @param:  id  number  chapter编号
 *  @param:  audio  file  录音文件
 * */
const chapterAudioUpload = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        id = '',
    } = ctx.request.body;
    const {
        audio = null
    } = ctx.request.files;
    if (id === '' || isNaN(Number.parseInt(id)) || !/.mp3$/.test(audio.name) || audio.type !== 'audio/mpeg') {
        ctx.response.body = paramsMissing();
    } else {
        const params = {
            id,
            audio
        };
        let chapter = await chapterAddUploadService(userInfo, params);
        if (typeof chapter === 'string') {
            ctx.response.body = error(chapter);
        } else {
            ctx.response.body = success(chapter);
        }
    }
    next();
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  删除章节接口
 *  @param:  id  number  chapter编号
 * */
const chapterDelete = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        id = ''
    } = ctx.request.body;
    if (id === '' || isNaN(Number.parseInt(id))) {
        ctx.response.body = paramsMissing();
    } else {
        const chapter = await chapterDeleteService(userInfo, id);
        if (typeof chapter === 'string') {
            ctx.response.body = error(chapter);
        } else {
            ctx.response.body = success(chapter);
        }
    }
    next();
};

/**
 *  @author:  kenzyyang
 *  @date:  2019-5-9
 *  @desc:  分页查询章节信息接口
 *  @param< currentPage  number  当前页
 *  @param< currentSize  number  当前页条数
 * */
const audioGetAllById = async (ctx, next) => {
    const {
        id = '',
        currentPage = '',
        currentSize = ''
    } = ctx.request.body;
    if (id === '' || isNaN(Number.parseInt(id)) || currentPage === '' || currentSize === '' || isNaN(Number.parseInt(currentSize)) || isNaN(Number.parseInt(currentPage))) {
        ctx.response.body = paramsMissing();
    } else {
        const params = {
            id,
            currentPage,
            currentSize
        };
        let chapters = await chapterGetAllByIdService(params);
        if (typeof chapters === 'string') {
            ctx.response.body = error(chapters);
        } else {
            let result = {
                count: chapters.count,
                list: chapters.rows
            };
            ctx.response.body = success(result);
        }
    }
    next();
};

module.exports = {
    chapterAdd,
    chapterAudioUpload,
    chapterDelete,
    audioGetAllById
};