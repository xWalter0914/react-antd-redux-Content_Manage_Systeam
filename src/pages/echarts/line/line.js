import React from "react";
import {Card} from "antd";
import Themedarkness from '../Themedarkness'//导入自定义皮肤
import themeLight from '../themeLight'//导入自定义皮肤

// import echarts from 'echarts' //(⊙⊙?)导入全部图表 太庞大
//仅仅导入柱形图 按需加载
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'//指向的显示信息
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');

export default class Line extends React.Component {
    constructor(props) {
        super(props)
        echarts.registerTheme('light',themeLight)//注入皮肤
        echarts.registerTheme('dark',Themedarkness)//注入皮肤
    }
    getOptions=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            yAxis:{
               type: 'value'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[
                {
                    name:'订单量',
                    type: 'line',
                    data:[
                        1000,2000,1500,3000,2100,800,1200
                    ]
                }
                
            ],
            tooltip:{
                trigger:'axis'
            }
        }
        return option
    }
    getOptions2=()=>{
        let option={
            title:{text:'用户骑行订单'},
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    // stack: '总量',
                    data: [
                        1200,
                        3000,
                        4800,
                        6000,
                        3000,
                        12000,
                        16000
                    ]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    // stack: '总量',
                    data: [
                        1800,
                        2000,
                        6000,
                        4000,
                        3000,
                        9000,
                        12000
                    ]
                },{
                    name: '小蓝订单量',
                    type: 'line',
                    // stack: '总量',
                    data: [
                        3200,
                        1900,
                        1500,
                        2600,
                        2000,
                        3500,
                        8000
                    ]
                }
            ]
        }
        return option
    }
    getOptions3=()=>{
        let option={
            title:{text:'用户骑行订单'},
            xAxis: {
                boundaryGap:false,//Y轴是否与阴影面积相接
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            tooltip:{
                trigger:'axis'
            },
            series:{
                areaStyle: {},//折线阴影
                name:'OFO',
                type:'line',
                data:[1000,3200,3500,1600,2000,2600,6000]
            }
        }
        return option
    }
    render(){
        return(
            <div>
                <Card title='折线图表一-单折线'>
                    <ReactEcharts option={this.getOptions()} theme='light'/>
                </Card>
                <Card title='折线图表二-多折线' style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOptions2()} theme='light'/>
                </Card>
                <Card title='折线图表三-填充折线' style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOptions3()} theme='dark'/>
                </Card>
            </div>
        )
    }
}