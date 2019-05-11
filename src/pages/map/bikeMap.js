import React from "react";
import {Card} from "antd";
import Axios from "./../../axios/Axios";
import FormCpmponent from "../../components/BaseForm/FormCpmponent";

export default class BikeMap extends React.Component {
    state={total_count:''}
    componentDidMount() {
        this.request();
    }
  handleFilter = params => {
    this.params = params;
    this.request();
  };
  request = () => {
    Axios.ajax({
        url:'map/bike_list',
        data:{
            params:this.params
        }
    }).then((res)=>{
        if(res.code===0){
             this.renderMap(res.result);
            this.setState({
                total_count:res.result.total_count
            })
        }
    })
  };
    
    renderMap=(result)=>{
        let list=result.route_list;
        this.map=new window.BMap.Map('container')

        this.map.enableScrollWheelZoom()//鼠标滚轮缩放
        this.map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))//缩放控件
        this.map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))//缩放控件

        let gps1=list[0].split(',')//起点
        let startPoint=new window.BMap.Point(gps1[0],gps1[1])//经纬度
        let gps2=list[list.length-1].split(',')//终点
        let endPoint=new window.BMap.Point(gps2[0],gps2[1])
        this.map.centerAndZoom(endPoint,11)//终点作为中心
        //绘制起点图标
        let startPointIcon=new window.BMap.Icon('/bike/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        let bikeMarkerStart=new window.BMap.Marker(startPoint,{icon:startPointIcon})
        this.map.addOverlay(bikeMarkerStart)
        //绘制终点图标
        let endPointIcon=new window.BMap.Icon('/bike/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd=new window.BMap.Marker(endPoint,{icon:endPointIcon})
        this.map.addOverlay(bikeMarkerEnd)
        //绘制行驶路线
        let routeList=[];
        list.forEach((item)=>{
            let p=item.split(',')
            routeList.push(new window.BMap.Point(p[0],p[1]))
        })
        let polyLine=new window.BMap.Polyline(routeList,{
            strokeColor:'#1354C0',
            storkeWeight:2,//路线宽度
            stokeOpacity:1//透明度
        })
        this.map.addOverlay(polyLine)
        //绘制服务区
        let serviceList=result.service_list
        let servicePointList=[]
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let ServicepolyLine=new window.BMap.Polyline(servicePointList,{
            strokeColor:'#ef4136',
            storkeWeight:2,//路线宽度
            stokeOpacity:1//透明度
        })
        this.map.addOverlay(ServicepolyLine)
        //添加自行车图标
        let bikeList=result.bike_list
        let bikeIcon=new window.BMap.Icon('/bike/bike.jpg',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        bikeList.forEach(item => {
            let p=item.split(',')
            let point=new window.BMap.Point(p[0],p[1])
            let bikeMarker=new window.BMap.Marker(point,{icon:bikeIcon})
            this.map.addOverlay(bikeMarker)
        });

    }

  formList = [
    {
      type: "城市",

    },
    {
      type: "时间查询"
    },
    {
      type: "select",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      initialValue: "0",
      width: 80,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "结束行程" }
      ]
    }
  ];
  render() {
    return (
      <div>
        <Card>
          <FormCpmponent
            formList={this.formList}
            filterSubmit={this.handleFilter}
          />
        </Card>
        <Card style={{marginTop: 10}}>
            <div>共{this.state.total_count}辆车</div>
            <div id='container' style={{height: 500}}></div>
        </Card>
      </div>
    );
  }
}
