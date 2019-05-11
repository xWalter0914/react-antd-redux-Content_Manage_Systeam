import React from 'react'
import {Card,Table,Modal,Button,message} from 'antd'
import Axios from './../../axios/Axios'
import utils from './../../utils/utils'

export default class BasicTable extends React.Component {
    componentDidMount() {
        this.request()
    }
    state={
        selectedCheckedRowKeys:[],//多选框选中行数
        selectedRows:[],//多选框选中内容
        selectedRadioRowKeys:'0',//单选框选中行数
        selectedItem:'',//单选框选中内容
        dataSource:[
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interesting:'1',
                birthday:'2004-01-02',
                address:'广东省惠州市桥东市场',
                timeUp:'09:00'
            },{
                id:'1',
                userName:'Lucy',
                sex:'1',
                state:'1',
                interesting:'1',
                birthday:'2004-01-02',
                address:'广东省惠州市桥东市场',
                timeUp:'09:00'
            },{
                id:'2',
                userName:'Tom',
                sex:'1',
                state:'1',
                interesting:'1',
                birthday:'2004-01-02',
                address:'广东省惠州市桥东市场',
                timeUp:'09:00'
            }
        ],
        dataSource2:[],
        pagination:'',
    }
    params = {page:1}
    request=()=>{
        // /table/list
        Axios.ajax({
            url:'/table/list',
            data:{
                params:{page:this.params.page},
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code===0){
                res.result.list.map((item,index)=>{
                    item.key=index
                    return item
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedCheckedRowKeys:null,
                    selectedRows:[],
                    pagination:utils.pagination(res,(current)=>{
                        this.params.page=current//更换页数
                        this.request()
                    })
                })
                
            }
        })
    }
    onRowClickHandle=(record,index)=>{
        let selectKey=[index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
        Modal.info({
            title:`${record.userName}信息`,
            content:`地址:${record.address}`
        })
    }
    onDeleteHandle=()=>{
        let rows = this.state.selectedRows
        let ids=[]
        rows.map((item)=>{
            ids.push(item.id)
            return item
        })
        Modal.confirm({
            title:'删除确认:',
            content:`你确定要删除这些数据吗? \n数据: ${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功')
                 this.setState({
                    selectedCheckedRowKeys:null,
                    selectedRows:[]
                })
                this.request();//刷新页面
            }
            
        })
    }
    render() {
        const columns = [//表头
            {
                title:'用户id',
                dataIndex:'id'
            },{
                title:'用户名',
                dataIndex:'userName'
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男':'女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                render(state){
                   let config={
                       '1':'咸鱼',
                       '2':'浪子',
                       '3':'才子',
                       '4':'FE前端攻城狮',
                       '5':'创业者'
                   }
                   return config[state]
                }
            },{
                title:'爱好',
                dataIndex:'interesting',
                render(state){
                   let config={
                        '1':'游泳',
                        '2':'篮球',
                        '3':'足球',
                        '4':'跑步',
                        '5':'攀岩',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'KTV',
                        '9':'无'
                   }
                   return config[state]
                }
            },{
                title:'生日',
                dataIndex:'birthday'
            },{
                title:'地址',
                dataIndex:'address'
            },{
                title:'早起时间',
                dataIndex:'timeUp'
            }
        ]
        this.state.dataSource.map((item,index)=>{
            item.key=index;
            return item
        })
        const rowRadioSelection={
            type:'radio',
            selectedRadioRowKeys:this.state.selectedRadioRowKeys
        }
        const rowCheckedSelection={
            type:'checked',
            selectedRowKeys:this.state.selectedCheckedRowKeys,
            onChange:(selectedCheckedRowKeys,selectedRows)=>{
                this.setState({
                    selectedCheckedRowKeys:selectedCheckedRowKeys,
                    selectedRows:selectedRows
                })
            }
        }
        return (
           <div>
                <Card title='基础表格'>
                    <Table
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource}//数据
                        pagination={false}//分页按钮
                    />
                </Card>
                <Card title='动态数据渲染表格' style={{margin:'10px 0'}}>
                    <Table
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource2}//数据
                        pagination={false}//分页按钮
                    />
                </Card>
                <Card title='Mock-单选' style={{margin:'10px 0'}}>
                    <Table
                        rowSelection={rowRadioSelection}
                        onRow={(record,index) => {
                            return {
                                onClick: (event) => {this.onRowClickHandle(record,index)}    // 点击行
                            };
                        }}
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource2}//数据
                        pagination={false}//分页按钮
                    />
                </Card>
                <Card title='Mock-复选' style={{margin:'10px 0'}}>
                    <div>
                        <Button type='danger' onClick={this.onDeleteHandle}>删除</Button>
                    </div>
                    <Table
                        rowSelection={rowCheckedSelection}
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource2}//数据
                        pagination={false}//分页按钮
                    />
                </Card>
                <Card title='Mock-表格分页' style={{margin:'10px 0'}}>
                    <Table
                        pagination={this.state.pagination}//分页封装
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource2}//数据
                    />
                </Card>
           </div> 
        );
    }
}