import React from 'react'
import {Row,Col} from 'antd'
import './Header.css'
import utils from './../../utils/utils'
import Axios  from './../../axios/Axios'
import { connect } from 'react-redux'

class Header extends React.Component{
constructor(props) {
  super(props)
  
  this.state = {
    userName:'曹先生',
    sysTime:'',
    pictureUri:'',
    weather:''
  };
};
componentWillReceiveProps(nextProps){
    console.log(nextProps)
}
getWeather(){
    Axios.jsonp({
        url:'http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC%E5%B8%82&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp0'
    }).then((res)=>{
        if(res.status === 'success'){
            let data=res.results[0].weather_data[0]
            this.setState({
                pictureUri:data.dayPictureUrl,
                weather:data.weather
            })
        }
    })
}
componentDidMount() {
    this.getWeather()
    setInterval(() => {
        let sysTime=utils.formateDate( new Date().getTime() )
        this.setState({
            sysTime
        })
    }, 1000);
}

    render(){
        const menuType=this.props.menuType
        return(
            <div className="header"> 
                <Row className="header-top">
                {
                    !menuType ? '' 
                    : 
                    <Col span={6} style={{textAlign: 'left'}}>{/* 24代表全部 */}
                        <img style={{width:30,height:30}} src='/favicon.ico' alt=''/>
                        <span style={{marginLeft: -50,fontSize: 17}}>测试管理系统 订单详情</span>
                    </Col>
                }
                    <Col span={menuType ? 18 :24}>{/* 24代表全部 */}
                        <span>欢迎，{this.state.userName}</span>
                        <a href='/'>退出</a> 
                    </Col>
                </Row>
                {
                    menuType ? '' : 
                    <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        {this.props.menuName}
                    </Col>
                    <Col span={20 } className="time">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather"><img className="weatherimg" src={this.state.pictureUri} alt='' /> {this.state.weather}</span>
                    </Col>
                </Row>
                }
                
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return(
        {menuName:state.menuName}
    )
}
export default connect(mapStateToProps)(Header);