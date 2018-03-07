import React,{PureComponent} from 'react'
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select,message } from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
const { Option, OptGroup } = Select;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);


const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
function handleChange(value) {
    console.log(`selected $(value)`);
}

export default class BTAssetDetail extends PureComponent{
    constructor(props) {
        super(props);
        this.columns = [
            {title: 'AssetName', dataIndex: 'asset_name',key:'asset_name',
                render: (text, record) => this.renderColumns(text, record, 'assetName'),
            },
        { title: 'Price', dataIndex: 'price', key: 'price',
            render: (text, record) => this.renderColumns(text, record, 'price')
            },
        { title: 'ExpireTime', dataIndex: 'expire_time', key: 'date',
            render: (text, record) => this.renderColumns(text, record, 'date'),
        },
        { title: 'Description', dataIndex: 'description', key: 'description',
            render: (text, record) => this.renderColumns(text, record, 'description'),
        },
        { title: 'Delete', dataIndex: 'delete',key:'delete',
            render: (text, record) => {
                return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#" style={{color:"#6d6df5"}}>Delete</a>
                        </Popconfirm>
                );
            },
        },
        { title: 'operation', dataIndex: 'operation',key:"operation",
                render: (text, record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                  <a onClick={() => this.save(record.asset_id)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.asset_id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                                    : <a onClick={() => this.edit(record.asset_id)}>Edit</a>
                            }
                        </div>
                    );
                },
            }];

        this.state = {
            data:[],
        }
    }

    componentDidMount(){
        // 请求查询数据
        this.onHeaderRefresh()
    }

    onHeaderRefresh(){
        let reqUrl = '/asset/buy/query'
        BTFetch(reqUrl,'POST').then(response=>{
            if(response && response.code=='0'){
                let data = response.data
                this.setState({data})
            }else{
                message.error('查询数据失败')
            }
        })
    }


    onDelete(key){
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
        const deleteDataSource = this.state.data[key];//被删除的一行的数据
        BTFetch("","post",deleteDataSource).then((data)=>{
            console.log(data)
        })
    }
    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                key={record.asset_id}
                onChange={value => this.handleChange(value, record.asset_id, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }

    }
    save(key) {
                const newData = [...this.state.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    delete target.editable;
                    this.setState({ data: newData });
                    this.cacheData = newData.map(item => ({ item }));
                }
                const postNewData = newData[key];
                BTFetch("","post",postNewData).then(data=>{
                    console.log(data)
                })
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    render() {
        return (
            <div>
                <Table bordered dataSource={this.state.data} columns={this.columns} />
            </div>
        );
    }
}
