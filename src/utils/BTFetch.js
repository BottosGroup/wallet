import config from './config.js'
const pkg = require('../../package.json')


export default (url,method,params,options={
    full_path:false,
    service:'service'
})=>{
    let blockchain = config.blockchain;
    let service = config.service;
    let mock = config.mock;
    let reqUrl = ''

    if(pkg.MOCK){
        reqUrl = mock.base_url+url
    }else if(options.service==='service'){
        reqUrl = service.base_url + service.version+url
    }

    // 如果自己写的全路径，直接用全路径
    if(options.full_path) reqUrl = url;

    let methodUpStr = method.toUpperCase(); // 统一转换成大写
    let requestParams = {
        method: methodUpStr,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (methodUpStr == 'GET') {
        let str = getFetchUrl(params);
        reqUrl += str;
    }else{
        requestParams.body = JSON.stringify(params);
    }
    return fetch(reqUrl, requestParams)
        .then(response => response.json());
}

/**
 * 返回get请求的请求地址
 * @param params
 * @returns {string}
 */
const getFetchUrl = (params)=>{
    let str = '';
    if (typeof params === 'object' && params) {
        str += '?';
        for (let key in params) {
            str += key + '=' + params[key] + '&';
        }
    }
    return str;
}


/**
 * post方式ContentType:urlencode 时的body参数
 * @param params
 * @returns {string}
 */
const getUrlencode = (params)=>{
    let str = '';
    if (typeof params === 'object' && params) {
        for (let key in params) {
            let paramKeyStr = ''
            if(typeof params[key] ==='object'){
                paramKeyStr = getUrlencode(params[key]);
            }else {
                paramKeyStr = params[key];
            }
            str += key + '=' + paramKeyStr + '&';
        }

    }
    return str;
}
  
  