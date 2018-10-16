import React,{Component} from 'react';
import {Route,NavLink,withRouter,Switch,Redirect} from 'react-router-dom';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import '../sass/film.scss'
import Nowplaying from './film/now-playing';
import Comingsoon from './film/coming-soon';

class Film extends Component{
    constructor(){
        super();
        this.state = {
            tabs:[
            { 
                title: '正在热映',
                path:'/film/now-playing'
            },
            { 
                title: '即将上映',
                path:'/film/coming-soon'
            },
            ]
        }
    }
    render(){
        return(
            <div>
                <ul className="tabs">
                    {
                    this.state.tabs.map((item,idx)=>{
                        return <li key={idx} ><NavLink to={item.path} activeClassName="tab-active">{item.title}</NavLink></li>
                    })
                    }
                </ul>
                <Switch>
                    <Route path="/film/now-playing" component={Nowplaying} />
                    <Route path="/film/coming-soon" component={Comingsoon} />
                    <Redirect to="/film/now-playing" />
                </Switch>
          </div>
        );
       
    }
}
Film = withRouter(Film);
export default Film;