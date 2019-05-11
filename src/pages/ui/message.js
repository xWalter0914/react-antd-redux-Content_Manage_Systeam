import React from 'react'
import {Card,Button,message} from 'antd'
import  './ui.css'

export default class Message extends React.Component {
    
    state = {}
        showMessage=(type)=>{
           message[type]('123')
        }
    render() {
        return (
            <div>
                <Card title='全局提示框'> 
                    <Button type='primary' onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type='primary' onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type='primary' onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}