import React from "react";
import {Card} from "antd";
import echartTheme from '../Themedarkness'//导入自定义皮肤
import themeLight from '../themeLight'//导入自定义皮肤

// import echarts from 'echarts' //(⊙⊙?)导入全部图表 太庞大
//仅仅导入柱形图 按需加载
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'//指向的显示信息
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');

export default class Pie extends React.Component {
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
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:{
                name:'订单量',
                type:'pie',
                data:[
                    {value:1000,name:'周一'},{value:800,name:'周二'},{value:1600,name:'周三'},
                    {value:1200,name:'周四'},{value:1500,name:'周五'},{value:2000,name:'周六'},
                    {value:1700,name:'周日'}
                ]
            },
            tooltip:{
                trigger:'item',
                //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
                formatter:'{a}<br/>{b}:{c}({d}%)'
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
                orient:'vertical',
                right:10,
                top:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:{
                name:'订单量',
                type:'pie',
                radius:['50%','80%'],//内环,外环
                data:[
                    {value:1000,name:'周一'},{value:800,name:'周二'},{value:1600,name:'周三'},
                    {value:1200,name:'周四'},{value:1500,name:'周五'},{value:2000,name:'周六'},
                    {value:1700,name:'周日'}
                ]
            },
            tooltip:{
                trigger:'item',
                //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
                formatter:'{a}<br/>{b}:{c}({d}%)'
            }
        }
        return option
    }
    getOptions3=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:{
                name:'订单量',
                type:'pie',
                data:[
                    {value:1000,name:'周一'},{value:800,name:'周二'},{value:1600,name:'周三'},
                    {value:1200,name:'周四'},{value:1500,name:'周五'},{value:2000,name:'周六'},
                    {value:1700,name:'周日'}
                ].sort((a,b)=>{
                    return a.value-b.value
                }),//排序
            roseType:'radius'//南丁格尔图
            },
            tooltip:{
                trigger:'item',
                //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
                formatter:'{a}<br/>{b}:{c}({d}%)'
            }
        }
        return option
    }
    render(){
        return(
            <div>
                <Card title='饼状图表一'>
                    <ReactEcharts option={this.getOptions()} theme='light'/>
                </Card>
                <Card title='饼状图表二' style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOptions2()} theme='light'/>
                </Card>
                <Card title='饼状图表三' style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOptions3()} theme='dark'/>
                </Card>
            </div>
        )
    }
}