import config from './config.js'
const version = config.version;

export default (url,method,params)=>{
    let methodUpStr = method.toUpperCase(); // 统一转换成大写
    let fetchUrl = config.baseUrl + '/identity' + url;

    let requestParams = {
        method: methodUpStr,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (methodUpStr == 'GET') {
        let str = getFetchUrl(params);
        fetchUrl += str;
      }else{
          requestParams.body = JSON.stringify(params);
      }


      console.log({
          fetchUrl,
          requestParams
      })

      return fetch(fetchUrl, requestParams)
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
  
  