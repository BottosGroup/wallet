import React,{PureComponent} from 'react'
import { Radio, Row, Col,Modal } from 'antd';
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            value:'',
            type:'',
            data:[{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"说明.js","file_number":1,"file_policy":"policytest","file_size":1606},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"11.txt","file_number":1,"file_policy":"policytest","file_size":366},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"liu132618","file_number":1,"file_policy":"policytest","file_size":1766},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"biying.js","file_number":1,"file_policy":"policytest","file_size":7611},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"新建文本文档 (2).txt","file_number":1,"file_policy":"policytest","file_size":991},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"速记.txt","file_number":1,"file_policy":"policytest","file_size":683}]
        }
    }

    handleOk(){
        this.setState({
            visible:false
        })

        let callBackData = {}
        if(this.state.type=='asset'){
            callBackData = {
                type:'asset',
                value:this.state.value
            }
        }else if(this.state.type == 'assetTemp'){
            callBackData = {
                type:'assetTemp',
                value:this.state.value
            }
        }else{
            callBackData = {
                type:'other',
                value:this.state.value
            }
        }

        this.props.handleFile(callBackData);
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    onChange(e){
        this.setState({value:e.target.value});
        // console.log(this.state.value);

    }

    componentDidMount(){
        // this.setState({data:this.props.fileall})
        // console.log(this.state.data)
    }
    render(){
        // console.log(this.state.data)
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                this.state.data.map((value,index)=>{
                                        return (
                                            <Row key={index} span={8}><Radio value={value.file_name}>{value.file_name}</Radio></Row>
                                        )
                                    })
                            }
                            {/*<Row span={8}><Radio value="B">人物表情图片.zip</Radio></Row>*/}
                        </Col>
                    </RadioGroup>
                </div>
            </Modal>
        )
    }
}