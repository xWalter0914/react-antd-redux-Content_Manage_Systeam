import React from 'react';



export default class Info extends React.Component{
    render(){
        return(
            <div>
                这里是测试动态路由的功能
                获取到的动态值:{this.props.match.params.value}
            </div>
        );
    }
}