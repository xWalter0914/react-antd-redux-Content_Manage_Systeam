import React from 'react'
import {Card,Form,Button,Input,message,Icon,Checkbox} from 'antd'
import './ui.css'
const FormItem =Form.Item;
class LoginForm extends React.Component {
    onClickhandle=()=>{
        let userinfo=this.props.form.getFieldsValue();
        this.props.form.validateFields((err,value)=>{
            if(!err){
                message.success(`欢迎您,${userinfo.userName},登录成功`)
            }else{}
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card title='行内登录表单' className='card-wrap'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>    
                            <Input placeholder='请输入密码' type='password'/>
                        </FormItem>
                        <FormItem>
                            <Button>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='水平方向登录表单 - getFieldDecorator+Icon' className='card-wrap'>
                    <Form style={{width:300}}>
                        <FormItem>
                        {
                            getFieldDecorator('userName',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },{
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入用户名'/>
                            )
                        }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord',{
                                    initialValue:'',
                                    rules:[
                                        // 参考校验规则API
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        },{
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入密码' type='password'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    initialValue:true,
                                    valuePropName:'checked'
                                })(<Checkbox type='checkbox'>记住密码</Checkbox>)
                            }
                            <a href="/" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button
                                type='primary'
                                onClick={()=>this.onClickhandle()}
                            >登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(LoginForm);