import React from "react";
import { Card } from "antd";
import "./detail.css";
import Axios from'../../axios/Axios'
export default class OrderDetail extends React.Component {
    state={
        orderinfo:{},
        orderId:this.props.match.params.orderId
    }
    componentDidMount() {
        if(this.state.orderId){
            this.getDataInfo(this.state.orderId)
        }
    }
    getDataInfo=(orderId)=>{
        Axios.ajax({
            url:'/order/detail',
            data:{
                params:{orderId:orderId}
            }
        }).then((res)=>{
            if(res.code===0){
                this.setState({
                    orderinfo:res.result
                })
                this.renderMap(res.result)
            }
        })
    }
    //添加地图控件
    MapControl=()=>{
        this.map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))//缩放控件
        this.map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))//缩放控件
        this.map.enableScrollWheelZoom()//鼠标滚轮缩放
    }

    //渲染地图
    renderMap=(result)=>{
        this.map = new window.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京',11)
        this.MapControl()
        this.drawBikeRoute(result)
    }

    //绘制行驶路线
    drawBikeRoute=(result)=>{
        let positionlist=result.position_list
        let startPoint='';
        let endPoint='';
        if(positionlist.length>0){
            //绘制起点
            let start=positionlist[0]
            let end=positionlist[(positionlist.length)-1]
            startPoint=new window.BMap.Point(start.lon,start.lat)
            let startIcon=new window.BMap.Icon('/bike/start_point.png',
            new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42),
            })
            let startMarker=new window.BMap.Marker(startPoint,{icon:startIcon})
            this.map.addOverlay(startMarker)
            //绘制终点
            endPoint=new window.BMap.Point(end.lon,end.lat)
            let endIcon=new window.BMap.Icon('/bike/end_point.png',
            new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42),
            })
            let endMarker=new window.BMap.Marker(endPoint,{icon:endIcon})
            this.map.addOverlay(endMarker)
            //连接绘制路线图
            let trackPoint=[]
            for(let i=0;i<positionlist.length;i++){
                let point=positionlist[i];
                trackPoint.push(new window.BMap.Point(point.lon,point.lat))
            }
            let polyline=new window.BMap.Polyline(trackPoint,{//直线
                strokeColor:'#1869AD',
                storkeWeight:3,
                storkeOpacity:1
            })
            this.map.addOverlay(polyline)
            this.map.centerAndZoom(endPoint ,11)//定位点为目标终点
            //绘制服务区
            let areaPoint=[]
            for(let i=0;i<result.area.length;i++){
                let point=result.area[i];
                areaPoint.push(new window.BMap.Point(point.lon,point.lat))
            }
            let polygon=new window.BMap.Polygon(areaPoint,{
                strokeColor:'#CE0000',
                storkeWeight:4,
                storkeOpacity:1,
                fillColor:'#ff8605',
                fillOpacity:0.4
            })//多边形
             this.map.addOverlay(polygon)
        }
    }
  render() {
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className='order-map'/>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{this.state.orderinfo.mode===1 ? '服务区模式' :'停车点模式'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content" >{this.state.orderinfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content" >{this.state.orderinfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content" >{this.state.orderinfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content" >{this.state.orderinfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content" >{this.state.orderinfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶终点</div>
                <div className="detail-form-content" >{this.state.orderinfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content" >{(this.state.orderinfo.distance)/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
