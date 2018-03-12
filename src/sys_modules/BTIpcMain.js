const {app,ipcMain} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();

//  获取keystore文件
ipcMain.on('get-key-store',(event,fileName)=>{
    let keyStorePath = appPath + '/user_data/'+fileName+'.bto'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        // let keyStoreObj = JSON.parse(result);
        event.sender.send('get-key-store-reply',result)
    })
})

ipcMain.on('save-key-store',(event,accountName,params)=>{
    // 获取账户名
    // let accountName = params.account_name;
    let keyStoreStr = JSON.stringify(params)
    let keyStorePath = appPath + '/user_data/'+accountName+'.bto'
    fs.writeFile(keyStorePath,keyStoreStr,(error,response)=>{
        console.log('save-key-store success')
    })
})








