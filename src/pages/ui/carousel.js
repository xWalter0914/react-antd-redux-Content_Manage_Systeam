import React from 'react'
import {Card,Carousel} from 'antd'
import  './ui.css'

export default class Carousels extends React.Component {
    render() {
        return (
            <div>
                <Card title='文字轮播'>
                    <Carousel autoplay effect='fade'>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片轮播' className='silder-wrap'>
                    <Carousel autoplay effect='fade'>
                        <div><img src='/carousel/1.jpg' alt='' style={{height:'100%',width:'100%'}}/></div>
                        <div><img src='/carousel/2.jpg' alt='' style={{height:'100%',width:'100%'}}/></div>
                        <div><img src='/carousel/3.jpg' alt='' style={{height:'100%',width:'100%'}}/></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}