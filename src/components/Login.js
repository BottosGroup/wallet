import React,{PureComponent} from 'react'
import {Modal,Input,Button,Upload,Icon,message} from 'antd'
import path from 'path'
import BTCryptTool from '../tools/BTCryptTool'
import BTFetch from '../utils/BTFetch';
import {setAccount,getAccount,isLogin} from '../tools/localStore'
import {getKeyStore} from '../tools/BTIpcRenderer'
import ecc from 'eosjs-ecc'
const Buffer = require('buffer').Buffer;
// 文件导入
const importFile = (callback)=>{
    let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    if(!selectedFile) return;
    let name = selectedFile.name;//读取选中文件的文件名
    let size = selectedFile.size;//读取选中文件的大小
    let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容
    reader.onload = function(){
        let rs = this.result
        callback(rs)
    }
}

export default class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false,
            password:'',
            keyStore:''
        }
    }

    async onHandleUnlock(){
        if(this.state.password == ''){
            message.error('请输入密码')
            return
        }

        let blockInfo = await this.getBlockInfo();
        let data = await this.getDataInfo()
        let keyStore = await getKeyStore((keyStore)=>{
            if(keyStore == undefined){
                message.error('请先导入keyStore文件')
                return;
            }
            let keyStoreObj = JSON.parse(keyStore)

            // 用密码解密keyStore
            try{
                let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
                let decryptoData = JSON.parse(decryptoStr);
                if(decryptoData.code!='0'){
                    message.error('密码错误，请重新输入密码')
                    return;
                }
                
                let url = '/user/login'
        
                let params = {
                    // blockInfo,
                    // data
                }
        
                BTFetch(url,'POST',params)
                .then(response=>{
                    if(response && response.code=='0'){
                        message.success('登录成功')
                        let accountInfo = {
                            username:"yuanjunliang",
                            token:"jslkdfjsdlfa"
                        }
                        setAccount(accountInfo)
                        this.setState({
                            visible:false
                        })
    
                        this.props.onHandleLogin(true)
                    }else{
                        message.error('登录失败')
                    }
                })
            }catch(error){
                message.error('密码错误，请重新输入密码')
            } 
        })
    }

    // 获取区块信息
    async getBlockInfo(){
        let reqUrl = '/user/GetBlockInfo'
        return await BTFetch(reqUrl,'GET')
    }

    // 获取data信息
    async getDataInfo(){
        let reqUrl = '/user/GetBin'
        let params = {
            // username:'btd352'
        }
        return await BTFetch(reqUrl,'POST')
    }

    closeModal(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <Modal 
                visible={this.state.visible}
                footer={null}
                onCancel={()=>this.closeModal()}
            >
                <div className="marginRight">
                    <div className="container row">
                        <Input placeholder="请输入密码" className="marginRight" onChange={(e)=>{this.setState({password:e.target.value})}}/> 
                        <Button type="danger" onClick={()=>this.onHandleUnlock()}>解锁</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}