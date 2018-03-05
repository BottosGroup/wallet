const Router = require('koa-router')
const router = new Router()
const yuanjia = require('../data/yuanjia')


router.get('/asset/modify',yuanjia.asset_modify)


module.exports = router.routes()