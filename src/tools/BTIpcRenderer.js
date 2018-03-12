const electron = window.electron;
const ipcRenderer = electron.ipcRenderer;


const GET_KEY_STORE = 'get-key-store';
const GET_KEY_STORE_REPLY = 'get-key-store-reply'
const SAVE_KEY_STORE = 'save-key-store'

exports.getKeyStore = (fileName,callback)=>{
    ipcRenderer.send(GET_KEY_STORE,fileName)
    ipcRenderer.on(GET_KEY_STORE_REPLY,(event,response)=>{
        callback(response)
    })
}

exports.setKeyStore = (accountName,params)=>{
    ipcRenderer.send(SAVE_KEY_STORE,accountName,params)
}