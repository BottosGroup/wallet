const Router = require('koa-router')
const router = new Router()
const yj = require('../data/yj')


router.post('/user/register',yj.user_register)


module.exports = router.routes()