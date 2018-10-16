import React,{Component} from 'react';
import { Accordion, List ,Badge} from 'antd-mobile';
import axios from 'axios';

import '../sass/cinema.scss';

class Cinema extends Component{
    constructor(){
        super();
        this.state = {
            alldata:[],
            citys:[],
        }
    }
    componentDidMount(){
        axios.get('/api/v4/api/cinema').then(res=>{
            let data = res.data.data.cinemas;
            let qcity = data.map(item=>{
                return item.district.name
            });
            this.setState({
                alldata:data,
                citys:[...new Set(qcity)]
            })
          console.log(this.state.alldata);

          console.log(this.state.citys);
        
        });
    }
    onChange = (key) => {
        console.log(key);
      }
    render(){
        return(
            <div>
                {
                    this.state.citys.map((item,idx)=>{
                       return <Accordion className="my-accordion" key={idx} onChange={this.onChange}>
                            <Accordion.Panel header={item} key={idx}>
                                <List>
                                    {
                                        this.state.alldata.map((obj,idx)=>{
                                            if(item===obj.district.name){
                                                return <div key={idx} className="zuo-item">
                                                    <div className="fl">
                                                        <h3>{obj.name} <Badge text="座" hot style={{ marginLeft: 8}} /></h3>
                                                        <p>{obj.address}</p>
                                                        <p>距离未知</p>
                                                    </div>
                                                    <div>&gt;</div>
                                                </div>
                                            }
                                            
                                        })
                                    }
                                </List>
                            </Accordion.Panel>

                        </Accordion>
                    })
                }
                
            </div>
        );
    }
}

export default Cinema;