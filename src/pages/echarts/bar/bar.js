import React from "react";
import {Card} from "antd";
import echartTheme from '../Themedarkness'//导入自定义皮肤
import themeLight from '../themeLight'//导入自定义皮肤
// import echarts from 'echarts' //(⊙⊙?)导入全部图表 太庞大
//仅仅导入柱形图 按需加载
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'//指向的显示信息
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');

export default class Bar extends React.Component {
    constructor(props) {
        super(props)
        echarts.registerTheme('light',themeLight)//注入皮肤
        echarts.registerTheme('dark',echartTheme)//注入皮肤
    }
    getOptions=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'//指着 显示信息
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,3000,2000,1200,800,1500]
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
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['ofo','摩拜','小蓝']//过滤器
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[//数据源
                {
                    name:'ofo',
                    type:'bar',
                    data:[1000,2000,3000,2000,1200,800,1500]
                },{
                    name:'摩拜',
                    type:'bar',
                    data:[2200,1800,1200,1000,3000,900,2300]
                },{
                    name:'小蓝',
                    type:'bar',
                    data:[1000,1100,900,2100,1200,1000,1500]
                }
            ],
            tooltip:{
                trigger:'axis'//指着 显示信息
            }
        }
        return option
    }
    render(){
        return(
            <div>
                <Card title='柱形图表一'>
                    <ReactEcharts option={this.getOptions()} theme='light'/>
                </Card>
                <Card title='柱形图表二' style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOptions2()} theme='dark'/>
                </Card>
            </div>
        )
    }
}