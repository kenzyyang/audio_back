const {
    success,
    error,
    paramsMissing
} = require('../common/response');
const {
    audioAddService
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

module.exports = {
    audioAdd
};