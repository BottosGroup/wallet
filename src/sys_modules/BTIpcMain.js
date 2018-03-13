const {app,ipcMain} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();
const {ipcEventName} = require('../utils/EventName')
const electron = require('electron')
const {dialog} = electron;

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,fileName)=>{
    let keyStorePath = appPath + '/user_data/'+fileName+'.bto'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        event.returnValue = {error,result}
    })
})

ipcMain.on(ipcEventName.save_key_store,(event,accountName,params)=>{
    // 获取账户名
    // let accountName = params.account_name;
    let keyStoreStr = JSON.stringify(params)
    let keyStorePath = appPath + '/user_data/'+accountName+'.bto'
    fs.writeFile(keyStorePath,keyStoreStr,(error,response)=>{
        console.log('save-key-store success')
    })
})

ipcMain.on(ipcEventName.import_file,(event,options)=>{
    dialog.showOpenDialog(options,(filePaths)=>{
        if(filePaths!=undefined) {
            for(let i=0;i<filePaths.length;i++){
                let filePath = filePaths[i]
                fs.readFile(filePath,'utf8',(error,result)=>{
                    event.returnValue = result
                })
            }
        }else{
            event.returnValue = {
                error:'read file failure'
            }
        }
    })
})

ipcMain.on(ipcEventName.key_store_list,(event)=>{
    let keyStorePath = appPath+'/user_data/'
    let result = fs.readdirSync(keyStorePath)
    event.returnValue = result
})






