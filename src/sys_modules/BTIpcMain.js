const {app,ipcMain} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();

//  获取keystore文件
ipcMain.on('get-key-store',(event,args)=>{
    let keyStorePath = appPath + '/user_data/keystore.bto'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        // let keyStoreObj = JSON.parse(result);
        event.sender.send('get-key-store-reply',result)
    })
})

ipcMain.on('save-key-store',(event,params)=>{
    let keyStoreStr = JSON.stringify(params)
    let keyStorePath = appPath + '/user_data/keystore.bto'
    fs.writeFile(keyStorePath,keyStoreStr,(error,response)=>{
        console.log('save-key-store success')
    })
})








