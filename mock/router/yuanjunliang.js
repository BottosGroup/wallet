const Router = require('koa-router')
const router = new Router()
const yuanjunliang = require('../data/yuanjunliang')


router.get('/user/register',yuanjunliang.user_register)


module.exports = router.routes()