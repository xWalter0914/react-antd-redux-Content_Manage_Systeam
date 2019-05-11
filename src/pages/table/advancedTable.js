import React from 'react'
import {Card,Table,Modal,message,Badge} from 'antd'
import Axios from './../../axios/Axios'


export default class AdvancedTable extends React.Component {
    componentDidMount() {
        this.request()
    }
    state={
        sortOrder:'',
        dataSource2:[],
        pagination:'',
    }
    params={page:1}
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
                    dataSource:res.result.list,

                })
                
            }
        })
    }
    onChangeHandle=(pagination, filters, sorter)=>{//点击排序
        this.setState({
            sortOrder:sorter.order
        })
    }
    //删除操作
    onDeleteHandle=(item)=>{
        Modal.confirm({
            title:'删除确认:',
            content:'您确认要删除数据吗?',
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    }
    render(){
        const columns = [//表头
            {
                title:'用户id',
                dataIndex:'id',
                width:80,
            },{
                title:'用户名',
                dataIndex:'userName',
                width:80
            },{
                title:'性别',
                dataIndex:'sex',
                width:80,
                render(sex){
                    return sex===1 ? '男':'女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                width:80,
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
                width:80,
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
                dataIndex:'birthday',
                width:80
            },{
                title:'地址',
                dataIndex:'address',
                width:120
            },{
                title:'早起时间',
                dataIndex:'timeUp',
                width:80
            }
        ]

        const columns2 = [//表头
            {
                title:'用户id',
                dataIndex:'id',
                fixed:'left',
                width:80,
            },{
                title:'用户名',
                fixed:'left',//固定列
                dataIndex:'userName',
                width:80
            },{
                title:'性别',
                dataIndex:'sex',
                width:80,
                render(sex){
                    return sex===1 ? '男':'女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                width:80,
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
                width:80,
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
                dataIndex:'birthday',
                width:80
            },{
                title:'地址',
                dataIndex:'address',
                width:120
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80
            },{
                title:'生日',
                dataIndex:'birthday',
                fixed:'right',
                width:80
            }
        ]

        const columns3 = [//表头
            {
                title:'用户id',
                dataIndex:'id',
            },{
                title:'用户名',
                dataIndex:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男':'女'
                }
            },{
                title:'年龄',
                dataIndex:'age',
                sorter:(a,b)=>{//添加一个排序按钮
                    return a.age-b.age  //上小下大排序方式
                },
                sortOrder:this.state.sortOrder
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
                dataIndex:'birthday',
            },{
                title:'地址',
                dataIndex:'address',
            },{
                title:'早起时间',
                dataIndex:'timeUp',
            }
        ]
        const columns4 = [//表头
            {
                title:'用户id',
                dataIndex:'id',
            },{
                title:'用户名',
                dataIndex:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男':'女'
                }
            },{
                title:'年龄',
                dataIndex:'age',
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
                        '1': <Badge status='success' text='游泳' />,
                        '2':  <Badge status='processing' text='篮球' />,
                        '3': <Badge status='warning' text='足球' />,
                        '4': <Badge status='default' text='足球' />,
                        '5': <Badge status='error' text='攀岩' />,
                        '6':'骑行',
                        '7':'桌球',
                        '8':'KTV',
                        '9':'无'
                   }
                   return config[state]
                }
            },{
                title:'生日',
                dataIndex:'birthday',
            },{
                title:'地址',
                dataIndex:'address',
            },{
                title:'早起时间',
                dataIndex:'timeUp',
            },{
                title:'操作',
                render:()=>{
                    return <a href='/' onClick={(item)=>{this.onDeleteHandle(item)}}>删除</a>
                }
            }
        ]

        return(
            <div>
                <Card title='头部固定' style={{margin:'10px 0'}}>
                    <Table
                        scroll={{ y: 240 }}//固定表头
                        pagination={false}//分页封装
                        bordered//表格边框样式状态
                        columns={columns}//表头
                        dataSource={this.state.dataSource}//数据
                    />
                </Card>
                <Card title='左侧固定' style={{margin:'10px 0'}}>
                    <Table
                        scroll={{ x: 1300 }}//固定左侧
                        pagination={false}//分页封装
                        bordered//表格边框样式状态
                        columns={columns2}//表头 计算Width长度:1320
                        dataSource={this.state.dataSource}//数据
                    />
                </Card>
                <Card title='排序表格' style={{margin:'10px 0'}}>
                    <Table
                        pagination={false}//分页封装
                        bordered//表格边框样式状态
                        columns={columns3}//表头 
                        dataSource={this.state.dataSource}//数据
                        onChange={this.onChangeHandle}
                    />
                </Card>
                <Card title='带操作的' style={{margin:'10px 0'}}>
                    <Table
                        pagination={false}//分页封装
                        bordered//表格边框样式状态
                        columns={columns4}//表头 
                        dataSource={this.state.dataSource}//数据
                    />
                </Card>
            </div>
        )
    }
}