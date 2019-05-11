import React from 'react';

import {Link} from 'react-router-dom'



export default class Main extends React.Component{
    render(){
        return(
            <div>
                this main page.
                <Link to='/mian/a'>嵌套路由</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}