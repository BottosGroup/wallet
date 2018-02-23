const {app,shell} = require('electron')
const fs = require('fs')


exports.getAppPath = ()=>{
    let appPath = app.getAppPath();
    let key_store_path = appPath + '/key_store.bto';
    fs.readFile(key_store_path,'utf8',(err,data)=>{
        console.log({
            data:JSON.parse(data)
        })
    })
}