const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, BlockedToken } = require('../app/models');

function verifyToken(ctx) {
    const rawToken = ctx.request.headers['x-token'] || '';
    return [jwt.verify(rawToken, process.env.JWT_SECRET), rawToken];
}

async function userInit(ctx, next) {
    let token, rawToken;
    try {
        [token, rawToken] = verifyToken(ctx);
    } catch (e) {
        return ctx.throw(401, {
            message: 'Invalid request token.',
            error: 'invalid_token',
        });
    }

    if (!(await checkUserLogin({ rawToken, token, ctx }))) {
        return ctx.throw(401, {
            message: 'Session not valid.',
            error: 'invalid_session',
        });
    }
    return await next();
}

async function checkUserLogin({ rawToken, token, ctx }) {
    const query = {
        // @ts-ignore
        _id: mongoose.Types.ObjectId(token._id),
        // @ts-ignore
        role: token.role,
    };

    const [user, blocked] = await Promise.all([
        User.findOne(query),
        BlockedToken.findOne({ token: rawToken }),
    ]);

    if (!user || blocked) {
        return false;
    }
    ctx.request.user = user;
    ctx.request.token = token;

    return true;
}

async function adminOnly(ctx, nxt) {
    if (ctx.request.user.role != 'admin') {
        return ctx.throw(403, 'Resource access is forbidden.');
    }
    await nxt();
}

module.exports = {
    userInit,
    adminOnly,
};
