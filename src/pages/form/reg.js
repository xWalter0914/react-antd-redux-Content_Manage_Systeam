import React from 'react'
import {Card,Form,Button,Checkbox,Input,Radio,Select,Switch,DatePicker,Upload,Icon,InputNumber,TimePicker} from 'antd'
import moment from 'moment'

const FormItem =Form.Item;
const RadioGroup=Radio.Group;
const Option=Select.Option;
const TextArea=Input.TextArea;
class RegisterForm extends React.Component {
    state={userImg:''}
    handleonRegister=()=>{
        let userinfo=this.props.form.getFieldsValue();
        console.log(JSON.stringify(userinfo))
    }
    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleUpload = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg:imageUrl,
            loading: false,
        }));
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const FormItemLayout={//栅格布局
            labelCol:{
                xs:24,
                sm:4,
            },
            wrapperCol:{
                xs:24,
                sm:12,
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{span:12,offset:4}
            }
        }
        return (
            <div>
                <Card title='注册表单'>
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...FormItemLayout}>
                        {
                            getFieldDecorator('userName',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    }
                                ]
                            })(
                                <Input placeholder='请输入用户名'/>
                            )
                        }
                        </FormItem>
                        <FormItem label='密码' {...FormItemLayout}>
                        {
                            getFieldDecorator('password',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,//星号
                                        message:'密码不能为空'
                                    }
                                ]
                            })(
                                <Input type='password' placeholder='请输入密码'/>
                            )
                        }
                        </FormItem>
                        <FormItem label='性别' {...FormItemLayout}>
                        {
                            getFieldDecorator('sex',{
                                initialValue:'1',
                            })(
                                <RadioGroup>
                                    <Radio value='1'>男</Radio>
                                    <Radio value='2'>女</Radio>
                                </RadioGroup>
                            )
                        }
                        </FormItem>
                        <FormItem label='年龄' {...FormItemLayout}>
                        {
                            getFieldDecorator('age',{
                                initialValue:18,
                                
                            })(
                                <InputNumber/>
                            )
                        }
                        </FormItem>
                        <FormItem label='当前状态' {...FormItemLayout}>
                        {
                            getFieldDecorator('state',{
                                initialValue:'1',
                            })(
                                <Select>
                                    <Option value='1'>咸鱼</Option>
                                    <Option value='2'>浪子</Option>
                                    <Option value='3'>才子</Option>
                                    <Option value='4'>FE攻城狮</Option>
                                    <Option value='5'>创业精英</Option>
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem label='爱好' {...FormItemLayout}>
                        {
                            getFieldDecorator('interesting',{
                                initialValue:'9',
                            })(
                                <Select mode='multiple'>
                                    <Option value='1'>游泳</Option>
                                    <Option value='2'>篮球</Option>
                                    <Option value='3'>足球</Option>
                                    <Option value='4'>跑步</Option>
                                    <Option value='5'>攀岩</Option>
                                    <Option value='6'>骑行</Option>
                                    <Option value='7'>桌球</Option>
                                    <Option value='8'>KTV</Option>
                                    <Option value='9'>无</Option>
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem label='婚姻状态' {...FormItemLayout}>
                        {
                            getFieldDecorator('isMarried',{
                                initialValue:true,
                                valuePropName:'checked',

                            })(
                               <Switch/>
                            )
                        }
                        </FormItem>
                        <FormItem label='生日' {...FormItemLayout}>
                        {
                            getFieldDecorator('brithday',{
                                initialValue:moment('2019-04-23')//需要安装moment组件
                            })(
                               <DatePicker
                               showTime
                               format='YYYY-MM-DD'//HH:MM:SS
                               />
                            )
                        }
                        </FormItem>
                        <FormItem label='地址' {...FormItemLayout}>
                        {
                            getFieldDecorator('address',{
                                
                            })(
                                <TextArea
                                    autosize={
                                        {minRows:1,maxRows:2}
                                    }
                                />
                            )
                        }
                        </FormItem>
                        <FormItem label='早起时间' {...FormItemLayout}>
                        {
                            getFieldDecorator('timeUp',{  
                            })(
                                <TimePicker/>
                            )
                        }
                        </FormItem>
                        <FormItem {...offsetLayout} >
                        {
                            getFieldDecorator('userImg')(
                                <Upload
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"//需要更换后台地址
                                    onChange={this.handleUpload}
                                >  
                                {this.state.userImg ? <img src={this.state.userImg} alt='' style={{width:100,height:100,backgroundSize:'cover'}}/> : <Icon type='plus'/>}
                                </Upload>
                            )
                        }
                        </FormItem>
                        <FormItem {...offsetLayout} >
                        {
                            getFieldDecorator('xieyi',{
                                initialValue:true,
                                valuePropName:'checked',
                            })(
                                <Checkbox >我已阅<a href='/'>使用协议</a></Checkbox>
                            )
                        }
                        </FormItem>
                        <FormItem {...offsetLayout} >
                        {
                            getFieldDecorator('register')(
                                <Button type='primary' 
                                    onClick={this.handleonRegister}
                                >注册</Button>
                            )
                        }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(RegisterForm);