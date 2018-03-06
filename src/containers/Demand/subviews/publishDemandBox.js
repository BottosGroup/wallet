import React,{PureComponent} from 'react'
import {} from 'antd';
import BTPublishDemand from "./PublishDemand";
const publishDemandBox = Form.create()(BTPublishDemand);



export default class BTPublishDemandBox extends PureComponent{
    constructor(props){
        super(props)

        // this.state = {
        //     address:''
        // }
    }

    render(){
        return(
            <publishDemandBox/>
        )
    }
}