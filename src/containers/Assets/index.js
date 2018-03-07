import React,{PureComponent} from 'react'
import BTAssetCell from './subviews/AssetCell'
import {Pagination} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import {isLogin} from '../../tools/localStore'

const BTHeaderSearch = () => (
    <div className="searchViewStyle">
        <div>
            <BTMyTag>全部</BTMyTag>
            <BTMyTag>图像</BTMyTag>
            <BTMyTag>数据清洗</BTMyTag>

            <BTMyTag>全部</BTMyTag>
            <BTMyTag>视频</BTMyTag>
            <BTMyTag>音频</BTMyTag>
            <BTMyTag>图片</BTMyTag>
        </div>
        <div style={{marginTop:20}}>
        <BTMyTag>全部</BTMyTag>
        <BTMyTag>数据挖掘</BTMyTag>
        <BTMyTag>图像</BTMyTag>
        <BTMyTag>数据清洗</BTMyTag>

        <BTMyTag>全部</BTMyTag>
        <BTMyTag>视频</BTMyTag>
        <BTMyTag>音频</BTMyTag>
        </div>
    </div>
) 

export default class BTAssets extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[1,2,3,4],
            current:1,
            isLogin:false
        };
    }

    componentDidMount(){
        let loginState = isLogin()
        this.setState({
            isLogin:loginState
        })
    }

    render(){
        return(
            <div>
                <BTHeaderSearch/>

                <div style={{marginTop:20}}>
                    <ul>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                        <li><Assetlist isLogin={this.state.isLogin} linkto="/assets/detail"/></li>
                    </ul>
                </div>

                <div style={{marginBottom:20}}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        )
    }
}