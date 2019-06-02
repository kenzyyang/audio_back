const {
    success,
    error,
    paramsMissing
} = require('../common/response');
const {
    audioAddService,
    audioGetAllService,
    audioDeleteService,
    audioChangeService,
    audioGetOneService,
    audioGetAllByTypeService,
    audioGetAllByUserNameService
} = require('../service/audio');

const audioAdd = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        audioName = '',
        audioType = '',
        audioAbstract = ''
    } = ctx.request.body;
    const {
        cover = ''
    } = ctx.request.files;
    if (!audioName || !audioType || !audioAbstract || !cover || (cover.type !== 'image/jpg' && cover.type !== 'image/jpeg')) {
        ctx.response.body = paramsMissing();
    } else {
        const data = {
            audioName,
            audioType,
            cover,
            audioAbstract
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

const audioGetAllByType = async (ctx, next) => {
    const {
        currentPage,
        currentSize,
        audioType
    } = ctx.request.body;
    if (isNaN(Number.parseInt(currentPage)) || isNaN(Number.parseInt(currentSize)) || isNaN(Number.parseInt(audioType))) {
        ctx.response.body = paramsMissing();
    } else {
        let data = {
            currentPage,
            currentSize,
            audioType
        };
        let audios = await audioGetAllByTypeService(data);
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

const audioGetAllByUserName = async (ctx, next) => {
    const {
        currentPage,
        currentSize,
        userName = ''
    } = ctx.request.body;
    if (isNaN(Number.parseInt(currentPage)) || isNaN(Number.parseInt(currentSize)) || userName === '') {
        ctx.response.body = paramsMissing();
    } else {
        let data = {
            currentPage,
            currentSize,
            userName
        };
        let audios = await audioGetAllByUserNameService(data);
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

const audioGetOne = async (ctx, next) => {
    const {
        id = ''
    } = ctx.request.body;
    if (id === '' || isNaN(Number.parseInt(id))) {
        ctx.response.body = paramsMissing();
    } else {
        let audio = await audioGetOneService(id);
        if (typeof audio === 'string') {
            ctx.response.body = error(audio);
        } else {
            ctx.response.body = success(audio);
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

const audioChange = async (ctx, next) => {
    const userInfo = ctx.tokenInfo;
    const {
        id = '',
        audioName = '',
        audioType = '',
        audioAbstract = '',
    } = ctx.request.body;
    if (id === '' || isNaN(Number.parseInt(id)) || audioName === '' || audioType === '' || audioAbstract === '') {
        ctx.response.body = paramsMissing();
    } else {
        const data = {
            id,
            audioName,
            audioType,
            audioAbstract
        };
        const audio = await audioChangeService(userInfo, data);
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
    audioDelete,
    audioChange,
    audioGetOne,
    audioGetAllByType,
    audioGetAllByUserName
};