import React,{PureComponent} from 'react'
import { Carousel,Button,Tag } from 'antd';

// 此处样式在Demand/subviews/styles.less中控制

export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:this.props.details
        }
    }

    render(){
        let data=this.props.location.query;
        return(
            <div>
            <div className="detailContentStyle">
                <div style={{padding:20}}>
                    <p><span>资产ID:</span>{data.asset_id}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>标题:</span>{data.asset_name}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>资产类型:</span>{data.type}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>期望价格:</span>{data.price}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>下架时间:</span>{data.expire_time}</p>
                    <div>
                        <Tag color="cyan">{data.feature_tag}</Tag>
                        {/*<Tag color="cyan">实用</Tag>*/}
                        {/*<Tag color="cyan">有价值</Tag>*/}
                    </div>

                    <div className="detailOptions">
                        <ul>
                            <li><Button type="primary" className="buyButton">购买</Button></li>
                            <li><Button type="primary"><a href={data.sample_path}>下载样例</a></Button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="detailDescribe">
                <p>{data.description}</p>
            </div>
            </div>
        )
    }
}