import React from 'react'
import {Card,Form,Button,Message,Modal,Input,Select,Tree,Transfer} from 'antd'
import Etable from '../../components/ETable/Etable'
import utils from '../../utils/utils'
import Axios from '../../axios/Axios'
import menuList from '../../config/menuConfig'
const FormItem=Form.Item
const Option=Select.Option
const TreeNode=Tree.TreeNode
class Permission extends React.Component {
    state={
        list:[],
        selectedIds:[],
        selectedRowKeys:'',
        selectedItem:'',
        RoleisVisible:false,
        PermissionisVisible:false,
        menuInfo:[],//选中的权限
        detailInfo:'',
        AuthorizeisVisible:false
    } 
    params={page:1}
    componentDidMount() {
        this.request()
    }
    request=()=>{
        Axios.requestList(this,'/role/list',{}, true)
    } 
    //打开创建角色弹框
    handleCreateAction=()=>{
        this.setState({
            RoleisVisible:true
        })
    }
    //角色提交
    handleRoleSubmit=()=>{
        let data=this.CreateRoleForm.props.form.getFieldsValue()//取值
        Axios.ajax({
            url:'/role/create',
            data:{params:data}
        }).then((res)=>{
            if(res.code===0){
                Message.success(res.msg)
            }
            this.setState({
                RoleisVisible:false
            })
            this.CreateRoleForm.props.form.resetFields()
            this.request()
        })
    }
    //打开设置权限
    handlePermissionACction=()=>{
        let item=this.state.selectedItem
        if(!item){
            Modal.info({
                title:'注意',
                content:'请选择一个角色'
            })
            return
        }
        this.setState({
            PermissionisVisible:true,
            menuInfo:item.menus
        })
    }
    //确认权限提交
    handelePermissionSubmit=()=>{
        let data=this.PermissionEditForm.props.form.getFieldsValue()
        data.role_id=this.state.selectedItem.id
        data.menus=this.state.menuInfo
        Axios.ajax({
            url:'role/user_role_edit',
            data:{params:{...data}}
        }).then((res)=>{
            if(res.code===0){
                Message.success(res.msg)
            }
            this.setState({
                PermissionisVisible:false
            })
            this.PermissionEditForm.props.form.resetFields()
            this.request()
        })
    }
    handleAuthorizeAction=()=>{
        let item=this.state.selectedItem
        if(!item){
            Modal.info({
                title:'注意',
                content:'请选择一个角色'
            })
            return
        }
        this.setState({
            AuthorizeisVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id)
    }
    //获取用户列表
    getRoleUserList=(id)=>{
        Axios.ajax({
            url:'/role/user_list',
            data:{
                params:{id}
            }
        }).then((res)=>{
            if(res.code===0){
                this.getAuthorizeUserList(res.result)
            }
        })
    }
    //筛选目标用户,只有status为开启状态=1则才能够被授权
    getAuthorizeUserList=(result)=>{
        const mockData=[]//所有用户
        const targetKeys=[]//目标用户
        if(result&&result.length>0){
            for(let i=0;i<result.length;i++){
                const data={
                    key:result[i].user_id,
                    title:result[i].user_name,
                    status:result[i].status,
                }
                if(data.status===1){
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            }
            this.setState({
                mockData,targetKeys
            })
        }
    }
    //提交修改用户权限
    handeleAuthorizeSubmit=()=>{
        let data={}
        data.user_ids=this.state.targetKeys||[]
        data.role_id=this.state.selectedItem.id
        Axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{...data}
            }
        }).then((res)=>{
            if(res.code===0){
                Message.success(res.msg)
                this.setState({
                    AuthorizeisVisible:false
                })
                this.request()
            }
        })
    }
    render() {
        const columns=[
            {
                title:'角色ID',
                dataIndex:'id'
            },{
                title:'角色名称',
                dataIndex:'role_name'
            },{
                title:'创建时间',
                dataIndex:'create_time',
                render:utils.formateDate
            },{
                title:'使用状态',
                dataIndex:'status',
                render:(status)=>{
                    return status===1 ? '启用':'停用'
                }
            },{
                title:'授权时间',
                dataIndex:'authorize_time',
                render:utils.formateDate
            },{
                title:'授权人',
                dataIndex:'authorize_user_name',
                
            }
        ]
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.handleCreateAction}>创建角色</Button>
                    <Button type='primary' onClick={this.handlePermissionACction}>设置权限</Button>
                    <Button type='primary' onClick={this.handleAuthorizeAction}>用户授权</Button>
                </Card>
                <div>
                    <Etable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                
                <Modal
                    title='创建角色'
                    visible={this.state.RoleisVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.setState({ 
                            RoleisVisible:false
                        })
                        this.CreateRoleForm.props.form.resetFields()
                    }}
                >
                    <CreateRoleForm wrappedComponentRef={(inst)=>this.CreateRoleForm=inst}/>{/*保存数据到CreateRoleForm */}
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.PermissionisVisible}
                    onOk={this.handelePermissionSubmit}
                    width={600}
                    onCancel={()=>{
                        this.setState({
                            PermissionisVisible:false
                        })
                    }}
                >
                    <PermissionEditForm
                        wrappedComponentRef={(inst)=>this.PermissionEditForm=inst}
                        patchMenuInfo={(checkedKeys)=>{this.setState({menuInfo:checkedKeys})}} //子组件勾选改变父组件menuInfo
                        detailInfo={this.state.selectedItem}//
                        menuInfo={this.state.menuInfo}//重新传入新的menuInfo
                        /* 传入选中条的值到PermissionEditForm */
                    />
                </Modal>
                <Modal
                    title='用户授权'
                    visible={this.state.AuthorizeisVisible}
                    onOk={this.handeleAuthorizeSubmit}
                    width={600}
                    onCancel={()=>{
                        this.setState({
                            AuthorizeisVisible:false
                        })
                    }}
                >
                <AuthorizeForm 
                    wrappedComponentRef={(inst)=>this.AuthorizeForm=inst}
                    detailInfo={this.state.selectedItem}
                    targetKeys={this.state.targetKeys}
                    mockData={this.state.mockData}
                    patchUserInfo={(targetKeys)=>{
                        this.setState({targetKeys})
                    }}
                />
                </Modal>
            </div>
        );
    }
}
export default Form.create()(Permission);
class CreateRoleForm extends React.Component{
    render(){
        const {getFieldDecorator} =this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <div>
                <Form>
                    <FormItem label='用户名' {...formItemLayout}>
                        {
                            getFieldDecorator('role_name',{
                            })(
                                <Input type="text" />
                            )
                        }
                    </FormItem>
                    <FormItem label='用户状态' {...formItemLayout}>
                        {
                            getFieldDecorator('status',{
                                initialValue:1
                            })(
                                <Select>
                                    <Option value={1}>启用</Option>
                                    <Option value={0}>停用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}
CreateRoleForm = Form.create({})(CreateRoleForm);


class PermissionEditForm extends React.Component {
    renderTreeNodes = data => {
        //递归获取menuCofing的TreeNode节点
        return data.map(item => {
        if (item.children) {
            //如果有子节点
            return (
            <TreeNode title={item.title} key={item.key}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        } else {
            return <TreeNode title={item.title} key={item.key} />;
        }
        });
    };
    onCheck=(checkedKeys)=>{//选择后调用方法改变父组件
        this.props.patchMenuInfo(checkedKeys)
    }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    let detailInfo = this.props.detailInfo;
    const { getFieldDecorator } = this.props.form;
    const menuInfo=this.props.menuInfo
    return (
      <div>
        <Form>
          <FormItem label="角色名称" layout="horizontal" {...formItemLayout}>
            <Input disabled placeholder={detailInfo.role_name} />
          </FormItem>
          <FormItem label="角色状态" layout="horizontal" {...formItemLayout}>
            {getFieldDecorator("status", {
              initialValue: detailInfo.status
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>停用</Option>
              </Select>
            )}
          </FormItem>
          <Tree checkable defaultExpandAll 
            onCheck={(checkedKeys)=>{//选择触发
                this.onCheck(checkedKeys)
            }}
            checkedKeys={menuInfo}//如果有数值则已选
          >
            <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNodes(menuList)}
            </TreeNode>
          </Tree>
        </Form>
      </div>
    );
  }
}
PermissionEditForm = Form.create({})(PermissionEditForm);

class AuthorizeForm extends React.Component{
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1
    }
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys)
    }
    render(){
        let detailInfo = this.props.detailInfo;
        let mockData = this.props.mockData;
        let targetKeys = this.props.targetKeys;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        return(
            <div>
                <Form>
                    <FormItem  label="角色名称" layout="horizontal" {...formItemLayout}>
                        <Input style={{width:415}} disabled placeholder={detailInfo.role_name} />
                    </FormItem>
                    <FormItem label='用户选择' {...formItemLayout} >
                        <Transfer
                            listStyle={{height:400}}
                            dataSource={mockData}
                            showSearch
                            locale={ 
                                {
                                    itemUnit: '  待选用户', 
                                    itemsUnit: '  已选用户',
                                    notFoundContent: '列表为空', 
                                    searchPlaceholder: '请输入搜索内容'
                                }
                            }
                            filterOption={this.filterOption}
                            targetKeys={targetKeys}
                            render={item=>item.title}
                            onChange={this.handleChange}
                        />
                    </FormItem>
                </Form>
            </div>
        )
    }
}
AuthorizeForm = Form.create({})(AuthorizeForm);