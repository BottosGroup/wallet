const electron = window.electron;
const ipcRenderer = electron.ipcRenderer;
const {ipcEventName} = window.eventName;

/**
 * 
 * @param {*} fileName 要获取的keystore的文件名，不需要加.bto
 */
const getKeyStore = (fileName)=>{
    let responst = ipcRenderer.sendSync(ipcEventName.get_key_store,fileName);
    return responst
}

const setKeyStore = (accountName,params)=>{
    ipcRenderer.send(ipcEventName.save_key_store,accountName,params)
}

const ipcImportFile = ()=>{
    let fileContent = ipcRenderer.sendSync(ipcEventName.import_file);
    return fileContent
}

const getKeyStoreList = ()=>{
    let keyStoreList = ipcRenderer.sendSync(ipcEventName.key_store_list);
    return keyStoreList
}


export default {
    getKeyStore,
    setKeyStore,
    ipcImportFile,
    getKeyStoreList
}
