import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
import {Table,message} from 'antd'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
export default class BTOtherExchange extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:[],
            rowCount:''
        }
        this.onChange=this.onChange.bind(this)
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.TransactionID}/>, dataIndex: 'transaction_id', key: 'title' ,render:(data)=>{
                    return <span>{data.substring(0,20)+'...'}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'date', key: 'time',render:(date)=>{
                return <span>{date.split(' ')[0]}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.From}/>, dataIndex: 'from', key: 'from'},
            { title: <FormattedMessage {...BlockBrowsingMessages.To}/>, dataIndex: 'to', key: 'to'},
            { title: <FormattedMessage {...BlockBrowsingMessages.Price}/>, dataIndex: 'price', key: 'price'},

        ];
    }
    componentDidMount() {
        this.getPagination(1,10)
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
    getPagination(page,pageSize) {
        let param = {
            pageSize: pageSize,
            pageNum: page
        };
        BTFetch('/dashboard/GetRecentTxList','POST',param)
            .then(res=>{
                if ( res.code == 1) {
                    let data=res.data.row;
                    this.setState({
                        data,
                        rowCount:res.data.rowCount,
                    })
                }
            }).catch(error=>{
            message.success(window.localeInfo["BlockBrowsing.SuccessfulPromote"])
        })
    }
    onChange(page, pageSize) {
        console.log(page,pageSize)
        this.getPagination(page, pageSize)
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div className="BTOtherExchange">
                {/*<div style={{width:"100%"}}>*/}
                <div className="blockView">
                    <h3>
                        <FormattedMessage {...BlockBrowsingMessages.Transaction}/>
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