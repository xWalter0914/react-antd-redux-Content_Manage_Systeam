import React from 'react'
import {Card,Button,Modal} from 'antd'
import  './ui.css'
export default class Modals extends React.Component {
    state={
        Showmodal1:false,
        Showmodal2:false,
        Showmodal3:false,
        }
    handleOpen=(type)=>{
        this.setState({
            [type]:true,
        })
    }
    handConfirm=(type)=>{
        
        Modal[type]({
            title:'确认?',
            content:'你确认你会了吗',
            onOk(){
                console.log('OK')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }
    render() {
        return (
           <div>
            <Card title='基础模态框'>
                <Button type='Primary' onClick={()=>{this.handleOpen('Showmodal1')}}>Open</Button>
                <Button type='Primary' onClick={()=>this.handleOpen('Showmodal2')}>自定义页脚</Button>
                <Button type='Primary' onClick={()=>this.handleOpen('Showmodal3')}>水平垂直居中</Button>
            </Card>
            <Card title='信息确认框'>
                <Button type='Primary' onClick={()=>{this.handConfirm('confirm')}}>确认</Button>
                <Button type='Primary' onClick={()=>this.handConfirm('info')}>info</Button>
                <Button type='Primary' onClick={()=>this.handConfirm('success')}>Success</Button>
                <Button type='Primary' onClick={()=>this.handConfirm('warning')}>Warn</Button>
            </Card>
            <Modal
                title='React'
                visible={this.state.Showmodal1}
                onCancel={()=>{
                    this.setState({
                        Showmodal1:false,
                    })
                }}
            >
                <p>Welcome</p>
            </Modal>
            <Modal
                title='React2'
                visible={this.state.Showmodal2}
                okText='下一步'
                cancelText='算了'
                onCancel={()=>{
                    this.setState({
                        Showmodal2:false,
                    })
                }}
            >
                <p>Welcome</p>
            </Modal>
            <Modal
                title='React3'
                visible={this.state.Showmodal3}
                wrapClassName="vertical-center"//新增这个Modal的类名
                onCancel={()=>{
                    this.setState({
                        Showmodal3:false,
                    })
                }}
            >
                <p>Welcome</p>
            </Modal>
           </div> 
        );
    }
}