exports.user_register = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:"注册成功"
    }
}

exports.user_login = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:'登录成功'
    }
}

exports.user_logout = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:'退出成功'
    }
}

exports.get_block_info = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:'OK',
        data:{
            ref_block_num:1962,
            ref_block_prefix:690387712,
            expiration:"2018-02-08T07:22:09"
        }
    }
}

exports.get_bin = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:'OK',
        data:{
            data:'037763311c6920646f206e6f74206b6e6f772061626f7574207468697320746f6f',
            random_num:"1234"
        }
    }
}

exports.asset_register = (ctx)=>{
    ctx.response.body = {
        code:'0',
        msg:'ok'
    }
}

exports.asset_query = (ctx)=>{
    ctx.response.body = {
        code:"0",
        msg:'ok',
        data:[
            {
                username:'john',
                asset_id:'390843202',
                asset_name:'表情图片',
                feature_tag:'图片资产',
                asset_sample_path:'http://www.baidu.com.png',
                asset_sample_hash:'ksljsldfjsdfl;safjsa;fjs;dlf',
                asset_storage_path:'http://ksdfjlsdjf.com',
                asset_storage_hash:'kjsdfl;ashskjdfhksfhdksjfdnska',
                expire_time:'2019-10-31',
                price:'2561',
                description:'一组描述年轻人喜欢的表情图标',
                upload_date:'2019-11-23'
            },
            {
                username:'john',
                asset_id:'390843202',
                asset_name:'表情图片',
                feature_tag:'图片资产',
                asset_sample_path:'http://www.baidu.com.png',
                asset_sample_hash:'ksljsldfjsdfl;safjsa;fjs;dlf',
                asset_storage_path:'http://ksdfjlsdjf.com',
                asset_storage_hash:'kjsdfl;ashskjdfhksfhdksjfdnska',
                expire_time:'2019-10-31',
                price:'2561',
                description:'一组描述年轻人喜欢的表情图标',
                upload_date:'2019-11-23'
            },
            {
                username:'john',
                asset_id:'390843202',
                asset_name:'表情图片',
                feature_tag:'图片资产',
                asset_sample_path:'http://www.baidu.com.png',
                asset_sample_hash:'ksljsldfjsdfl;safjsa;fjs;dlf',
                asset_storage_path:'http://ksdfjlsdjf.com',
                asset_storage_hash:'kjsdfl;ashskjdfhksfhdksjfdnska',
                expire_time:'2019-10-31',
                price:'2561',
                description:'一组描述年轻人喜欢的表情图标',
                upload_date:'2019-11-23'
            }
        ]
    }
}