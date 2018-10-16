import React, { Component } from 'react';
import { Drawer, List, NavBar, Icon, Card } from 'antd-mobile';
import {Route,Switch,Redirect,withRouter,NavLink} from 'react-router-dom';
import Home from './components/home';
import Film from './components/film';
import Cinema from './components/cinema';
import Shop from './components/shop';
import Wode from './components/wode';
import MyCard from './components/card';
import MyCity from './components/city';
import Detail from './components/film/detail/detail';

import './style/App.css';
import './sass/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBars , faAngleRight ,faUser} from '@fortawesome/free-solid-svg-icons'

library.add(faBars,faAngleRight,faUser);

class App extends React.Component {
  constructor(props){
    super(props);
  
  this.state = {
    open: false,
    city:'广州' || this.props.city,
    menus:[
      {
        text:'test',
        path:'/home'
    },
    {
      text:'首页',
      path:'/home'
    },{
      text:'影片',
      path:'/film'
    },{
      text:'影院',
      path:'/cinema'
    },{
      text:'商城',
      path:'/shop'
    },{
      text:'我的',
      path:'/wode'
    },{
      text:'卖座卡',
      path:'/card'
    }],
    title:'卖座电影' || this.props.title
  }
}
  goto(){
    let {history} = this.props;
    console.log(666);
    history.push('/city');
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    // fix in codepen
    const sidebar = (<List>
      {this.state.menus.map((i, index) => {
        return (
          <NavLink key={index} to={i.path}><List.Item 
          // thumb="http://www.51yuansu.com/pic2/cover/00/44/65/5814b6f35f2b7_610.jpg" 
          onClick={this.onOpenChange}
        >{i.text}
        < FontAwesomeIcon className="icons" icon ="angle-right"/>
        </List.Item>
        </NavLink>);
      })}
    </List>);

    return (<div >
      <NavBar icon={< FontAwesomeIcon icon ="bars"/>} onLeftClick={this.onOpenChange } style={{backgroundColor: "#282c34"}} className="box" rightContent={[
        <span key='0' onClick={this.goto.bind(this)}>{this.state.city}<Icon key='1' type="down" size="xxs"/></span>,
        < FontAwesomeIcon key='2' icon ="user" className="user"/>,
      ]}>{this.state.title}</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/film" component={Film}/>
          <Route path="/cinema" component={Cinema}/>
          <Route path="/shop" component={Shop}/>
          <Route path="/wode" component={Wode}/>
          <Route path="/card" component={MyCard}/>
          <Route path="/city" component={MyCity}/>
          <Route path="/detail" component={Detail}/>
          
          <Redirect from="/" to="/home" exact />
        </Switch>
       
      </Drawer>
      
    </div>); 
  }
}

App = withRouter(App);
export default App;