import React from 'react'
import {Card,Button,Icon} from 'antd'
import  './ui.css'
export default class Buttons extends React.Component {
    state={loading:true}
    render() {
        return (
           <div>
            <Card title='基础按钮'>
                <Button type='primary'>Primary</Button>
                <Button>normal</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                <Button disabled>Disabled</Button>
            </Card>
            <Card title='图形按钮'>
                <Button icon='plus'>创建</Button>
                <Button icon='edit'>编辑</Button>
                <Button icon="delete">删除</Button>
                <Button shape='circle' icon="search"></Button>
                <Button type='primary' icon="search"></Button>
                <Button  icon="download">下载</Button>
            </Card>
            <Card title='Loading按钮'>
                <Button type='primary' loading={this.state.loading}
                    onClick={()=>{
                        this.setState({
                            loading:true
                        })
                    }}
                >保存</Button>
                <Button shape='circle' loading={this.state.loading}></Button>
                <Button loading={this.state.loading}
                    onClick={()=>{
                        this.setState({
                            loading:true
                        })
                    }}
                >点击加载</Button>
                <Button shape='circle' type='primary' loading={this.state.loading}></Button>
                <Button type='primary'
                    onClick={()=>{
                        this.setState({
                            loading:false
                        })
                    }}
                >关闭</Button>
            </Card>
            <Card title='按钮组'>
                <Button.Group>
                    <Button><Icon type="left"/>返回</Button>
                    <Button>前进<Icon type="right"/></Button>
                </Button.Group>
            </Card>
           </div> 
        );
    }
}