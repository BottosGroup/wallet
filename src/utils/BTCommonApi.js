import * as BTFetch from './BTFetch'

// 获取区块信息
export const getBlockInfo = async()=>{
    let reqUrl = '/user/GetBlockInfo'
    return await BTFetch(reqUrl,'GET')
}

// 获取data信息
export const getDataInfo = async()=>{
    let reqUrl = '/user/GetBin'
    let params = {
        username:'btd352'
    }
    return await BTFetch(reqUrl,'POST',JSON.stringify(params))
}