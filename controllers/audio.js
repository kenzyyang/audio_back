const {
    success,
    error,
    paramsMissing
} = require('../common/response');
const {
    audioAddService,
    audioGetAllService,
    audioDeleteService
} = require('../service/audio');

const audioAdd = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        audioName = '',
        audioType = '',
    } = ctx.request.body;
    const {
        cover = ''
    } = ctx.request.files;
    if (!audioName || !audioType || !cover || (cover.type !== 'image/jpg' && cover.type !== 'image/jpeg')) {
        ctx.response.body = paramsMissing();
    } else {
        const data = {
            audioName,
            audioType,
            cover
        };
        let audio = await audioAddService(userInfo, data);
        if (typeof audio === 'string') {
            ctx.response.body = error(audio);
        } else {
            ctx.response.body = success(audio);
        }
    }
    next();
};

const audioGetAll = async (ctx, next) => {
    const {
        currentPage,
        currentSize
    } = ctx.request.body;
    if (isNaN(Number.parseInt(currentPage)) || isNaN(Number.parseInt(currentSize))) {
        ctx.response.body = paramsMissing();
    } else {
        let data = {
            currentPage,
            currentSize
        };
        let audios = await audioGetAllService(data);
        if (typeof audios === 'string') {
            ctx.response.body = error(audios);
        } else {
            const result = {
                count: audios.count,
                list: audios.rows
            };
            ctx.response.body = success(result);
        }
    }
    next();
};

const audioDelete = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        id = ''
    } = ctx.request.body;
    if (id === '' || isNaN(Number.parseInt(id))) {
        ctx.response.body = paramsMissing();
    } else {
        const audio = await audioDeleteService(userInfo, Number.parseInt(id));
        if (typeof audio === 'string') {
            ctx.response.body = error(audio);
        } else {
            ctx.response.body = success(audio);
        }
    }
    next();
};

module.exports = {
    audioAdd,
    audioGetAll,
    audioDelete
};