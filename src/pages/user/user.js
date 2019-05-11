import React from 'react'
import {Card,Modal,Button,Form,Input,Radio,DatePicker,Select,InputNumber,Message} from 'antd'
import Axios from './../../axios/Axios'
import utils from './../../utils/utils'
import FormCpmponent from '../../components/BaseForm/FormCpmponent'
import ETable from '../../components/ETable/Etable'
import moment from 'moment'
const FormItem=Form.Item
const Option=Select.Option

const RadioGroup=Radio.Group
const TextArea=Input.TextArea
export default class User extends React.Component {
    componentDidMount() {
        this.request()
    }
    formList=[{
        type:'input',
        label:'用户名',
        field:'user_name',
        placeholder:'请输入用户名',
        initialValue:'',
        width:100
        },{
        type:'input',
        label:'手机号',
        field:'mobile',
        placeholder:'请输入手机号',
        initialValue:'',
        width:100
        },{
        type:'datepicker',
        label:'入职日期',
        field:'user_date',
        placeholder:'请输入日期',
        
        width:100
        },
        ];
    state={
        userinfo:'',//选中的item
        type:'',
        isVisible:false,
        list:[]
    }
    params={page:1}
    request = () => {
        Axios.requestList(this,'/user/list',this.params,true)
    };
    handleFilter = (params)=>{
        this.params = params;
        this.request();
    }
    handleOperator=(type)=>{
        let item=this.state.selectedItem
        if(type==='create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }else if(type==='edit'){
            if(!item){
                Modal.info({
                    title:'提示:',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userinfo:item
            })
        }else if(type==='detail'){
            if(!item){
                Modal.info({
                    title:'提示:',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userinfo:item
            })
        }else if(type==='delete'){
            if(!item){
                Modal.info({
                    title:'提示:',
                    content:'请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title:"确认删除",
                content:`是否删除用户 - ${item.userName}`,
                onOk:()=>{
                    Axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                         if(res.code===0){
                            this.setState({
                                isVisible:false,
                            })
                            Message.success(res.msg)
                            this.request();
                        }
                    })
                },
            })
        }
    }
    //创建员工-提交
    handleSubmit=()=>{
        let type=this.state.type
        let data=this.userForm.props.form.getFieldsValue();
        Axios.ajax({
            url:type==='create' ? '/user/add' :'/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code===0){
                Message.success(res.msg)
                this.setState({
                    isVisible:false
                })
                this.request()
            }
        }) 
    }
    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
          }, {
            title: '用户名',
            dataIndex: 'userName'
          }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex === 1 ?'男':'女'
            }
          }, {
            title: '身份',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
          },{
            title: '爱好',
            dataIndex: 'interesting',
            render(interest){
                let config = {
                    '1':'游泳',
                    '2':'打篮球',
                    '3':'踢足球',
                    '4':'跑步',
                    '5':'爬山',
                    '6':'骑行',
                    '7':'桌球',
                    '8':'麦霸',
                    '9':'无'
                }
                return config[interest];
            }
          },{
            title: '状态',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried ===1 ?'已婚':'未婚'
            }
          },{
            title: '生日',
            dataIndex: 'birthday'
          },{
            title: '联系地址',
            dataIndex: 'address'
          },{
            title: '早起时间',
            dataIndex: 'timeUp'
          }
        ];
        let footer={}
        if(this.state.type==='detail'){
            footer={
                footer:null
            }
        }
        return (
           <div>
                <Card>
                    <FormCpmponent formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                    <div>
                        <ETable
                            updateSelectedItem={utils.updateSelectedItem.bind(this)}
                            columns={columns}
                            dataSource={this.state.list}
                            selectedRowKeys={this.state.selectedRowKeys}
                            selectedIds={this.state.selectedIds}
                            selectedItem={this.state.selectedItem}
                            pagination={this.state.pagination}
                        ></ETable>
                    </div>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields()
                        this.setState({isVisible:false})
                    }}
                    width={800}
                    {...footer}
                >
                    <UserForm type={this.state.type} userinfo={this.state.userinfo} wrappedComponentRef={(inst)=>{this.userForm=inst}}></UserForm>
                </Modal>
           </div> 
        );
    }
}
//弹出的Modal框内容
class UserForm extends React.Component{
    getState=(state)=>{
        return {
          "1": "咸鱼一条",
          "2": "风华浪子",
          "3": "北大才子",
          "4": "百度FE",
          "5": "创业者"
        }[state]
    }
    render(){
        let type=this.props.type
        let userinfo=this.props.userinfo||{}
        const {getFieldDecorator}=this.props.form;
        const formItemLayout={
            labelCol:{span:5},//字体
            wrapperCol:{span:19}//文本框控件
        }
        return(
            <Form layout='horizontal'>
                <FormItem label='用户名' {...formItemLayout}>
                    {
                        type==='detail' ? userinfo.userName:
                        getFieldDecorator('user_name',{
                            initialValue:userinfo.userName
                        })(
                            <Input type='text' placeholder='请输入用户名'/>
                        )
                        
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        type==='detail' ? userinfo.sex:
                        getFieldDecorator('sex',{
                            initialValue:userinfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>                                                 
                        )
                    }
                </FormItem>
                <FormItem label='年龄' {...formItemLayout}>
                    {
                        type==='detail' ? userinfo.age:
                        getFieldDecorator('age',{initialValue:userinfo.age})(
                            <InputNumber></InputNumber>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        type==='detail' ? this.getState(userinfo.state):
                        getFieldDecorator('state',{
                            initialValue:userinfo.state
                            })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='生日' {...formItemLayout}>
                    {
                        type==='detail' ? userinfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userinfo.birthday)
                        })(
                            <DatePicker/>
                        )
                    }
                </FormItem>
                <FormItem label='联系地址' {...formItemLayout}>
                    {
                        type==='detail' ? userinfo.address:
                        getFieldDecorator('address',{
                            initialValue:userinfo.address
                        })(
                            <TextArea rows={3} placeholder='请输入联系地址'/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm);