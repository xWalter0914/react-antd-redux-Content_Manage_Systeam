import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import Info from './info'
import about from './about'
import Topics from './Topics'
import Main from './Main'
import Notmatch from './notmatch'
export default class Router extends React.Component{
    render(){
        return(
            <HashRouter> 
                <Home>
                    <Switch>
                        <Route path='/main' render={()=>(
                            <Main>
                                <div>This is a sub child element</div>
                                <Route path='/main/:value' component={Info}/>
                            </Main>
                            )
                            }
                        ></Route>
                        <Route path='/about' component={about}/>
                        <Route path='/Topics' component={Topics}/>
                        <Route component={Notmatch}/>
                    </Switch>
                </Home>
                
            </HashRouter>
        );
    }
}