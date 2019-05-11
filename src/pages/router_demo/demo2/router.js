import React from 'react';
import {HashRouter,Route} from 'react-router-dom'
import Home from './Home'
import about from './about'
import Topics from './Topics'
import Main from './Main'
export default class Router extends React.Component{
    render(){
        return(
            <HashRouter> 
                <Home>
                    <Route path='/main' render={()=>(
                        <Main>
                            <div>This is a sub child element</div>
                            <Route path='/mian/a' component={about}/>
                        </Main>
                           )
                        }
                    ></Route>
                    <Route path='/about' component={about}/>
                    <Route path='/Topics' component={Topics}/>
                </Home>
            </HashRouter>
        );
    }
}