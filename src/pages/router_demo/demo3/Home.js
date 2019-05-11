import React from 'react';
import {Link} from 'react-router-dom'

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <Link to='/main'>Main</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/Topics'>Topics</Link>
                    </li>
                    <li>
                        <Link to='/imooc1'>imooc</Link>
                    </li>
                    <li>
                        <Link to='/imooc2'>imooc</Link>
                    </li>
                </ul>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}