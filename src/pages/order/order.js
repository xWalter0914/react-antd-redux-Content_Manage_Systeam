import React from "react";
import { Card, Button, Table, Form,Modal,message} from "antd";
import Axios from "./../../axios/Axios";
import FilterForm from '../../components/BaseForm/FormCpmponent'
const FormItem = Form.Item;

export default class Order extends React.Component {
  componentDidMount() {
    this.request();
  }
  state = {
    orderInfo:{},
    selectedItem:null,
    selectedRowKeys:[],
    list: [],
    orderConfirmVisble: false
  };
  formList=[{
        type:'select',
        label:'城市',
        field:'city',
        initialValue:'0',
        width:80,
        list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },{
        type:'时间查询'
    },{
      type:'select',
      label:'订单状态',
      field:'order_status',
      initialValue:'0',
      width:80,
      list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
    }
  ]
  params = { page: 1 };
  //获取订单列表
    request = () => { 
        Axios.requestList(this,'order/list',this.params,true)
    };
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    //打开结束订单弹窗
    onFinnishConfirm=()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        Axios.ajax({
            url:'/order/bike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code===0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }
    //点击结束订单按钮
    handleFinishOrder=()=>{
        let item = this.state.selectedItem;
        Axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code===0){
                message.success(res.msg)
                this.setState({
                    orderConfirmVisble: false
                })
                this.request()
            }
        })
    }

    //写入要查询的数据
    handleFilter = (params)=>{
        this.params = params;
        this.request();
    }
    onOpenDetail=()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单进行查询'
            })
            return
        }
        window.open('#/common/order/detail/'+item.id,'_blank')
    }
  render() {
    const columns=[
        {
            title:'订单编号',
            dataIndex:'order_sn'
        },{
            title:'车辆编号',
            dataIndex:'bike_sn'
        },{
            title:'用户名',
            dataIndex:'user_name',
            width:80
        },{
            title:'手机号码',
            dataIndex:'mobile',
            width:100
        },{
            title:'行驶里程',
            dataIndex:'total_mileage',
            width:100,
            render(distance){
                    return (distance/1000) + 'Km';
                }
        },{
            title:'订单状态',
            dataIndex:'status',
            width:100
        },{
            title:'开始时间',
            dataIndex:'start_time',
            width:110
        },{
            title:'结束时间',
            dataIndex:'end_time',
            width:110
        },
        {
            title:'订单金额',
            dataIndex:'total_fee'
        },
        {
            title:'实付金额',
            dataIndex:'user_pay'
        },  
    ]
    const formItemLayout = {
        labelCol:{span:5},
        wrapperCol:{span:19}
    }
    const rowSelection = {
        type: 'radio',
        selectedRowKeys:this.state.selectedRowKeys
    }
    return (
      <div>
        <Card>
          <FilterForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
            <Button type='primary' onClick={this.onOpenDetail}>订单详情</Button>
            <Button type='primary' style={{marginLeft:10}} onClick={this.onFinnishConfirm}>结束订单</Button>
        </Card>
        <div
          className="content-wrap"
          style={{
            background: "#ffffff",
            border: "1px solid #e8e8e8",
            margin: "-1px -1px"
          }}
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        }
                    };
                }}
          />
        </div>
        <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
      </div>
    );
  }
}