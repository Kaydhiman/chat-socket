const { io } = require('../bin/server');
const { userInit } = require('../middlewares')
const chatCtrl = require('./chat');

const chat = io.of('/chat').use(userInit);

chatCtrl(chat);