import React from 'react'
import menuList from '../../config/menuConfig'
import './NavLeft.css'
import { Menu } from 'antd';
import { connect }from 'react-redux'
import { swichMenu }from '../../redux/action/action'
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component{
    constructor(props) {
          super(props)
          this.state = {
            menuTreeNode:'',
            currentKey:[]//当前选中的Menuitem
          }
        }
        //菜单点击
    handleClick=({item, key} )=>{
        const {dispatch}=this.props
        dispatch(swichMenu(item.props.title));
        this.setState({
            currentKey:[key]
        })
    }
    componentDidMount() {
        const menuTreeNode=this.renderMenu(menuList);
        // let currentKey = window.location.hash.replace('#','') 替换#为空,但是如果有参数 就不能获得
        let currentKey =[ window.location.hash.replace(/#|\?.*$/g,'')] //替换#为空,并且替换?后面的值为空
        this.setState({
            menuTreeNode,
            currentKey,//当前选中的Menuitem
        })
    }
    renderMenu=(data)=>{
        return data.map((item)=>{
            //如果有children节点 那就继续遍历 递归
            if(item.children){
                return(
                    <SubMenu key={item.key} title={item.title}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return (
                <Menu.Item  key={item.key} title={item.title}>
                    <NavLink to={item.key}> {item.title} </NavLink> 
                </Menu.Item>
            )
        })
    }
    
    render(){
        return(
            <div>
                <div className="logo">
                    <img src={'/favicon.png'}  alt={""}/>
                    <h1>测试管理系统</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}//菜单选中
                    theme='dark'
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
} 
export default connect()(NavLeft)