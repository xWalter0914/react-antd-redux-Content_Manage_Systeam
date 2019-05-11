import React from 'react'
import {Card,Button,notification} from 'antd'
import  './ui.css'

export default class Notification extends React.Component {
    
    state = {}
        openNotification=(type,direction)=>{
            if(direction){
                notification.config({
                    placement:direction,
                })
            }
            notification[type]({
                message:'发工资了',
                description:'上个月考勤22天,实发250'
            })
        }
    render() {

        return (
            <div>
                <Card title='通知提醒框'> 
                    <Button type='primary' onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error')}>error</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning')}>Warning</Button>
                </Card>
                <Card title='通知提醒框'> 
                    <Button type='primary' onClick={()=>this.openNotification('success','topLeft')}>Success-topLeft</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info','topRight')}>Info-topRight</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error','bottomLeft')}>Error-bottomLeft</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning','bottomRight')}>Warning-bottomRight</Button>
                </Card>
            </div>
        );
    }
}