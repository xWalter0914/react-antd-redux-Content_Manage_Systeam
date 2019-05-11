import React from 'react';
import {HashRouter,Route,Link} from 'react-router-dom'
import Main from './Main'
import about from './about'
import Topics from './Topics'


export default class Demo1 extends React.Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/Topics">Topics</Link>
                        </li>
                    </ul>
                    <hr/>
                    <switch>
                        <Route exact path='/' component={Main}/> {/*exact不会进行拆分了 */}
                        <Route path='/about' component={about}/>
                        <Route path='/Topics' component={Topics}/>
                    </switch>
                    
                </div>
            </HashRouter>
        );
    }
}