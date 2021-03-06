import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
import {Table} from 'antd'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
export default class BTOtherBlocks extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            block_view:[],
            data:[],
            rowCount:'',
            newblock:'',
        }
        this.onChange=this.onChange.bind(this)
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.BlockNumber}/>, dataIndex: 'block_num', key: 'title'/*,render:(data)=>{
                return <span>{data.substring(0,16)+'...'}</span>
                }*/ },
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'timestamp', key: 'date',render:(date)=>{
                return <span>{date.split(' ')[0]}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Transaction}/>, dataIndex: 'transaction_merkle_root', key: 'looker',render:(data)=>{
                    return <span>{data.substring(0,16)+'...'}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Producer}/>,dataIndex: 'producer',key: 'x'},
        ];
    }
    componentDidMount() {
        this.getPagination(1,10)
    }
     getPagination(page,pageSize){
        let param={
            pageSize:pageSize,
            pageNum:page
        };
        BTFetch('/dashboard/GetBlockList','POST',param).then(res => {
            if (res&&res.code == 1) {
                if(res.data.rowCount>0){
                    let data=res.data.row;

                    this.setState({
                        data,
                        rowCount:res.data.rowCount
                    });
                    // if(data==null)
                    //     return;
                     // newBlockOne=res.data.row[0].block_num||'';
                    this.props.newblock();
                }
            }
        });
    }
    pagination(){
        let pagination={
            total:this.state.rowCount,
            defaultCurrent:1,
            pageSize:10,
            showQuickJumper:true,
            onChange:this.onChange
        }
        return pagination
    }
    onChange(page, pageSize) {
        this.getPagination(page, pageSize);

    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);

        return(
            <div className="OtherBlocksMessage">
                {/*<div style={{width:"100%"}}>*/}
                    <div className="blockView">
                        <h3>
                            <FormattedMessage {...BlockBrowsingMessages.Block}/>
                        </h3>
                        {/*<a >查看所有&lt;</a>*/}
                    </div>
                    <Table bordered pagination={this.pagination()} columns={columns} dataSource={this.state.data}
                    />
                {/*</div>*/}
            </div>
        )
    }
}