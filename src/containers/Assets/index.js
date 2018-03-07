import React,{PureComponent} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
const data=[
    {
        username:'liuhaoyu',
        asset_id:'390843202',
        asset_name:'搞笑图片',
        feature_tag:'图片资产',
        type:'图片',
        asset_sample_path:'http://www.baidu.com',
        asset_sample_hash:'ffffdsafffffffffffff3214134',
        expire_time:'2012-10-31',
        price:'100',
        description:'一组描述年轻人喜欢的表情图标一组描述年轻人喜欢的表情图标一组描述年轻人喜欢的表情图标一组描述年轻人喜欢的表情图标一组描述年轻人喜欢的表情图标',
        upload_date:'2010-11-23'
    },
    {
        username:'yuanjunliang',
        asset_id:'390843203',
        asset_name:'搞笑视频',
        feature_tag:'视频资产',
        type:'视频',
        asset_sample_path:'http://www.baidu.com.png',
        asset_sample_hash:'ffffdsafffffffffffff3214134',
        expire_time:'2019-10-31',
        price:'300',
        description:'年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻年轻人习惯的娱乐新闻',
        upload_date:'2010-1-23'
    },
    {
        username:'yuanjia',
        asset_id:'390843204',
        asset_name:'A声音',
        feature_tag:'听觉资产',
        type:'音频',
        asset_sample_path:'http://www.baidu.com.png',
        asset_sample_hash:'ffffdsafffffffffffff3214134',
        expire_time:'2019-10-31',
        price:'400',
        description:'一组描述年轻人喜欢的声音一组描述年轻人喜欢的声音一组描述年轻人喜欢的声音一组描述年轻人喜欢的声音一组描述年轻人喜欢的声音一组描述年轻人喜欢的声音',
        upload_date:'2019-11-23'
    }

];
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
            data:data
        };
    }
    render(){
        return(
            <div>
                <BTHeaderSearch/>

                <div style={{marginTop:20}}>
                    <ul>
                        {
                            this.state.data.map((value,index)=>{
                                return (

                                    <li key={index}><Assetlist list={value} /></li>
                                )
                            })
                        }
                        {/*<li><Assetlist linkto="/assets/detail"/></li>    linkto="/assets/detail"*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}

                    </ul>
                </div>

                <div style={{marginBottom:20}}>
                    <Pagination defaultCurrent={1} total={this.state.data.length} />
                </div>
            </div>
        )
    }
}