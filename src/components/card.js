import React,{Component} from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import '../sass/card.scss';

class Card extends Component{
    constructor(){
        super();
        this.state = {
            tabs :[
                { 
                    title:'卖座卡'
                },
                { 
                    title:'电子卖座卡'
                },
              ]
        }
    }
    render(){
        return(
        <div>
             <Tabs tabs={this.state.tabs}
      initialPage={1}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div className="maizuo">    
            <div className="texta">
                <label htmlFor="cardid">卡号:</label>
                <input type="text" id="cardid" placeholder="请输入卡号"/>
            </div>
            <div className="texta">
                <label htmlFor="password">密码:</label>
                <input type="password" id="password" placeholder="请输入密码"/>
            </div>
            <button className="card_query_bottom center-block" >查询</button>
      </div>
      <div>
      <div className="maizuo">    
            <div className="texta">
                <label htmlFor="Ecardid">卡号:</label>
                <input type="text" id="Ecardid" placeholder="请输入电子卡号"/>
            </div>
            <button className="card_query_bottom center-block" >查询</button>
      </div>
      </div>
    </Tabs>
        </div>
        );
    }
}

export default Card;