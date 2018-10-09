import React, { Component } from 'react';
import './style/App.css';
import { Drawer, List, NavBar, Icon, Card } from 'antd-mobile';
import {HashRouter,BrowserRouter,Route,Link,NavLink} from 'react-router-dom';
import Home from './components/home';
import Film from './components/film';
import Cinema from './components/cinema';
import Shop from './components/shop';
import Wode from './components/wode';
import MyCard from './components/card';
import 'antd-mobile/dist/antd-mobile.css';

console.log(Home)

class App extends Component{
  render(){
    return <div>
      <Nav/>
    </div>
  }
}

class Nav extends React.Component {
  state = {
    open: true,
    city:'广州',
    menus:[{
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
    }]
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
          thumb="http://www.51yuansu.com/pic2/cover/00/44/65/5814b6f35f2b7_610.jpg"
        >{i.text}</List.Item>
        </NavLink>);
      })}
    </List>);

    return (<div >
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange } className="box" rightContent={[
        <span key='0'>{this.state.city}<Icon key='1' type="down" size="xxs"/></span>,
        <Icon key='2' type="check-circle-o" />,
      ]}>卖座电影</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
      <Route path="/home" component={Home}/>
      <Route path="/film" component={Film}/>
      <Route path="/cinema" component={Cinema}/>
      <Route path="/shop" component={Shop}/>
      <Route path="/wode" component={Wode}/>
      <Route path="/card" component={MyCard}/>
      </Drawer>
    </div>);
  }
}
export default App;