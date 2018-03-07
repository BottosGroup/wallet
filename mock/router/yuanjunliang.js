const Router = require('koa-router')
const router = new Router()
const yuanjunliang = require('../data/yuanjunliang')


router.post('/user/register',yuanjunliang.user_register)
router.post('/user/login',yuanjunliang.user_login)
router.post('/user/logout',yuanjunliang.user_logout)
router.get('/user/GetBlockInfo',yuanjunliang.get_block_info)
router.post('/user/GetBin',yuanjunliang.get_bin)
router.post('/asset/register',yuanjunliang.asset_register)
router.post('asset/query',yuanjunliang.asset_query)




module.exports = router.routes()