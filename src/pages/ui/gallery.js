import React from 'react'
import {Card,Row,Col,Modal} from 'antd'
import  './ui.css'

export default class Gallery extends React.Component {
    state={currentImg:'',visible:false}
    openGallery=(src)=>{
        this.setState({
            currentImg:src,
            visible:true
        })
    }
    render() {
        const imgs=[
            ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'],
            ['6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'],
            ['11.jpg','12.jpg','13.jpg','14.jpg','15.jpg'],
            ['16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'],
            ['21.jpg','22.jpg','23.jpg','24.jpg','2.jpg']
        ]
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                hoverable
                cover={<img src={'/gallery/'+item} style={{width: '100%',height:'100%'}}
                    onClick={()=>this.openGallery(item)} alt=''
                    />
                }
                style={{marginBottom: 10}}
            >
            <Card.Meta
                    title="React Admin"
                    description="Test"
                />
            </Card>
        ))
        return (
            <div>
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
               
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
               
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
              
                    <Col md={5}>
                        {imgList[3]}
                    </Col>

                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal visible={this.state.visible}
                    width={300}
                    height={500}
                    title={'图片画廊'}
                    onCancel={()=>this.setState({
                        visible:false
                        })
                    }
                    footer={null}
                >
                    <img src={'/gallery/'+this.state.currentImg} alt='' style={{width: '100%',height:'100%'}}/>
                </Modal>
            </div>
        );
    }
}