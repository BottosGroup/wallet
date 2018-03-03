import React,{PureComponent} from 'react'
import { Radio,Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'
import BTAssetList from '../../../../components/BTAssetList'
import "../styles.less"
import BTCryptTool from '../../../../tools/BTCryptTool'
// import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;



const options = [{
    value: 'Video',
    label: 'Video',
    children: [{
        value: 'FacialRecognition',
        label: 'FacialRecognition',
        children: [{
            value: 'Person',
            label: 'Person',
        }],
    }],
}];

const props = {
    name:'file',
    action: 'http://10.104.10.152:8080/v2/asset/upload',
    multiple: false,
    data:{

    },
    onChange({ file, fileList }) {
        // console.log(file,fileList)
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
        if(file.status==='down'){
            message.success(`${file.name} file uploaded successfully`);
        }else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    },

};

const onChange = (dates, dateStrings)=> {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class BTUploadAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            value:1,
            title:'',
            price:''
        }
    }
    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    }

    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    title(e){
        this.setState({
            title:e.target.value,
        })
    }
    updata(){
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        var param={
            "code": "assetmng",
            "action": "assetreg",
            "args": {
                "asset_id": "filehashtest2",
                "basic_info": {
                    "user_name": "btd121",
                    "session_id": "sessidtestwc2",
                    "asset_name": this.state.title,
                    "feature_tag": 12345,
                    "sample_path": "pathtest",
                    "sample_hash": "samplehasttest",
                    "storage_path": "stpathtest",
                    "storage_hash": "sthashtest",
                    "expire_time": 345,
                    "price": 888,
                    "description": "destest",
                    "upload_date": 999,
                    "signature": "sigtest"
                }
            }
        };
        console.log(param);
        // getBlockInfo
        debugger;
        fetch('http://10.104.21.10:8080/v2/asset/register',{
            method:'POST',
                header:myHeaders,
            body:JSON.stringify(param)
        })
            .then(res=>{
                console.log(res)
            })
    }
    render(){
        return(

            <div className="asset">
                <BTAssetList ref={(ref)=>this.assetListModal = ref}/>
                <div className="upLoadForm">
                    <div className="Title">
                        <span>名称:</span>
                        <Input placeholder="名称" defaultValue={this.state.title} onChange={(e)=>this.title(e)} />
                    </div>
                    <div className="priceAndData">
                        <div className="price">
                            <span>价格:</span>
                            <Input placeholder='价格' />
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                        </div>
                        <div className="dataAssetType">
                            <span>资产分类: </span>
                            <Cascader style={{marginLeft:"10px"}} options={options} onChange={onChange} placeholder="Please select" />
                        </div>
                    </div>

                    <div className="featureTag">
                        <span>标签:</span>
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className="description">
                        <div>
                            <span>描述: </span>
                        </div>
                        <div className="textarea">
                            <TextArea rows={4} />
                        </div>
                    </div>
                    <div className="upLoadAndSubmit">
                        <div className="upLoad">
                            <div>
                                <span>上传样例</span>
                                <span onClick={()=>this.commitAsset()}>资源库筛选</span>
                                {/*<Upload {...props}>*/}
                                    {/*<Button>*/}
                                        {/*<Icon type="upload" /> 资源库筛选*/}
                                    {/*</Button>*/}
                                {/*</Upload>*/}
                            </div>
                            <div>
                                <span>上传资产</span>
                                <span onClick={()=>this.commitAsset()}>资源库筛选</span>
                            </div>
                        </div>
                        <div className="submit">
                            <Button type="submit" onClick={(e)=>this.updata(e)}>OK</Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
