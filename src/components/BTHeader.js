import React,{PureComponent} from 'react'
import './styles.less'
import {Link,hashHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import * as headerActions from '../redux/actions/HeaderAction'
import {connect} from 'react-redux'
import {Button,Modal,Menu, Dropdown, Icon} from 'antd'
import BTRowMenu from '../components/BTRowMenu'
import BTLogin from './Login'
import IsRegister from './Register'
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import BTPublishAssetModal from '../containers/Profile/Asset/subviews/BTPublishAssetModal'
import BTIcon from '../components/BTIcon'
import BTPublishDemand from '../containers/Demand/subviews/PublishDemand'
import BTFetch from '../utils/BTFetch'
import logo from '../static/img/logo.jpg'
import * as BTUtil from '../utils/BTUtil'
import BTIpcRenderer from '../tools/BTIpcRenderer'

class MenuLink extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link style={{color:'white'}} {...this.props}/>
        )
    }
}

class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true,
            isLogin:true
        }
    }

    // 设置本地化语言
    setLocale(){
        this.props.setLocale();
    }

    componentDidMount(){
        this.hidLoginView()
    }

    onLoginHandler(){
        this.showLoginView()
    }

    showLoginView(){
        this.props.headerActions.showLoginView({
            isShow:true
        })
    }

    hidLoginView(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleOk(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleCancel(e){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handlePublishDemand(){
        this.publishModal.setState({
            visible:true
        })
    }

    handlePublishAsset(){
        this.publishAssetModal.setState({
            visible:true
        })
    }
    isShowLogin(){
        this.isLoginShow.setState({
            visible:true
        })
    }
    isRegister(){
        this.isRegisterShow.setState({
            visible:true
        })
    }

    isLogin(isLogin){
        this.setState({
            isLogin:isLogin
        })
        console.log({
            isLogin
        })
    }

    logout(){
        console.log('logout')
        this.setState({isLogin:false})
    }

    menu(){
        return(
            <Menu>
                <Menu.Item key="0">
                    <Link to="/profile/asset">
                        <FormattedMessage id='Menu.Asset' defaultMessage="资产"/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/profile/need">需求</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/profile/collect">收藏</Link>
                </Menu.Item>
                <Menu.Item key="3" disabled>
                    <Link to="/profile/setting">设置</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="4" disabled>
                    <a href="#" onClick={()=>{this.logout()}}>登出</a>
                </Menu.Item>
            </Menu>
        )
    }

    importKeyStore(){
        console.log('importKeyStore')
        BTUtil.importFile((keyStore)=>{
            BTIpcRenderer.setKeyStore(keyStore)
        })
    }

    exportKeyStore(){
        console.log('exportKeyStore')
        // 从本地取出keystore文件
        BTIpcRenderer.getKeyStore((keyStore)=>{
            BTUtil.exportFile(keyStore,'utf8','keystore.bto')
        })
    }

    keyStoreMenu(){
        return(
            <Menu>
                {/* <Menu.Item key="1"><a href="#" onClick={()=>this.importKeyStore()}>导入KeyStore</a></Menu.Item> */}
                <Menu.Item key="1"><a href="javascript:;" className="file">导入KeyStore<input type="file" name="" id="fiels" value=""/></a></Menu.Item>
                <Menu.Item key="2"><a href="#" onClick={()=>this.exportKeyStore()}>导出KeyStore</a></Menu.Item>
            </Menu>
        )
    }

    render(){
        return(
            <div className="container header">
                <BTPublishDemand ref={(ref)=>this.publishModal = ref}/>

                <BTPublishAssetModal ref={(ref)=>this.publishAssetModal = ref}/>

                <BTLogin ref={(ref)=>this.isLoginShow = ref} onHandleLogin={(isLogin)=>this.isLogin(isLogin)}/>

                <IsRegister ref={(ref)=>this.isRegisterShow = ref}/>

                <Modal
                    title="Basic Modal"
                    visible={this.props.headerState.isShow}
                    onOk={()=>this.handleOk()}
                    onCancel={()=>this.handleCancel()}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>


                <div className="logoMenuStyle">
                    <div className="logoStyle">
                        {/* <img src="/static/img/logo.jpg"/> */}
                        <img src={logo} alt=""/>
                    </div>
                </div>

                <div className="loginBtnStyle">
                    <Button onClick={()=>this.handlePublishDemand()} style={{marginRight:10,background:"#1a1a1a",color:"white"}}><FormattedMessage id='Header.PublishDemand' defaultMessage="发布需求"/></Button>
                    <Button onClick={()=>this.handlePublishAsset()} style={{marginRight:10,background:"#1a1a1a",color:"white"}}>发布资产</Button>
                    <div className="marginLeft marginRight"><Link to="/profile/shopcart"><Icon type="shopping-cart" style={{fontSize:30,color:'white'}}/></Link></div>
                    <div>
                        {
                            this.state.isLogin ? 
                            <Dropdown overlay={this.menu()}>
                                <img className="userIcon"
                                    src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb"
                                />
                            </Dropdown> :
                            <div className='isLogin'><span onClick={()=>this.isShowLogin()}>登录</span>&nbsp;<span onClick={()=>this.isRegister()}>注册</span></div>
                            
                        }

                    </div>

                    <div>
                        <Dropdown overlay={this.keyStoreMenu()}>
                            <i className="iconfont icon-key" style={{fontSize:25,color:'white',marginLeft:10}}/>
                        </Dropdown>
                    </div>

                    <div style={{marginLeft:10}}>
                        <Button onClick={()=>this.setLocale()}>
                            {(this.props.locale == 'en-US') ? '中文' : 'English'}
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        headerState:state.headerState
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        headerActions:bindActionCreators(headerActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BTHeader)