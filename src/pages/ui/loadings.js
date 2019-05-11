import React from 'react'
import {Card,Icon,Spin,Alert} from 'antd'
import  './ui.css'

export default class Loadings extends React.Component {
    state = {  }
    render() {
        const icon=<Icon type='loading' style={{fontSize: 24}}></Icon>
        return (
            <div>
                <Card title='Spin'> 
                    <Spin size='default' style={{margin:'15px'}}/>
                    <Spin size='default' indicator={icon}/>
                </Card>
                <Card title='内容遮罩'> 
                    <Alert
                        message='React'
                        description='欢迎'
                        type='info'
                    />

                    <Spin tip={'加载中...'} spinning={true}>
                        <Alert
                            message='React'
                            description='欢迎'
                            type='warning'
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}