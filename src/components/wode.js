import React,{Component} from 'react';
import {List,Icon} from 'antd-mobile'; 
import '../sass/wode.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars);

const Item = List.Item;
class Wode extends Component{
    render(){
        return(
        <div className="me">
          <div className="toubu">
                <img className="avatar" src="https://pic.maizuo.com/usr/default/maizuomoren66.jpg" />
                <div className="info">
                    <h3>手机用户8839</h3>
                    <p>ID:220530340</p>
                    <a>退出</a>
                </div>
          </div>
          <div className="setting">
          <List className="my-list">
            <Item arrow="horizontal" onClick={() => {}}>
            <FontAwesomeIcon className="icons1" icon ="bars"/>
             <span className="order">影票订单</span><span className="count"><span className="secai">0</span>张</span></Item>
          </List>
          <List className="my-list">
            <Item arrow="horizontal" onClick={() => {}}><span className="order">影票代付订单</span><span className="count"><span className="secai">0</span>张</span></Item>
          </List>
          <List className="my-list">
            <Item arrow="horizontal" onClick={() => {}}><span className="order">商城订单</span>
            </Item>
          </List>
          <List className="my-list">
            <Item arrow="horizontal" onClick={() => {}}><span className="order">我的现金券</span><span className="count"><span className="secai">0</span>张</span>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}><span className="order">账户余额</span><span className="count"><span className="secai">0</span>元</span>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}><span className="order">我的卖座卡</span><span className="count"><span className="secai">0</span>张</span></Item>
          </List>
          <List className="my-list">
          <Item arrow="horizontal" onClick={() => {}}><span className="order">设置</span>
          </Item>
          </List>
          </div>
        </div>
        );
    }
}

export default Wode;