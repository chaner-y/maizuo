import React,{Component} from 'react';
import axios from 'axios';
import '../sass/city.scss';
class City extends Component{
    constructor(){
        super();
        this.state = {
            title:'城市定位',
            hot:[
                {
                    name:'北京',
                    pinyin:'beijing'
                },
                {
                    name:'上海',
                    pinyin:'shanghai'
                },
                {
                    name:'广州',
                    pinyin:'guangzhou'
                },
                {
                    name:'深圳',
                    pinyin:'shenzhen'
                },
            ],
            zimu:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
            city:[],
            currC:'' || '没能定位到城市'

        }
    }
    //获取当前定位的城市
    currentCity(){
        axios.get('https://restapi.amap.com/v3/ip?key=b542f461764c92222e78fffdff0d69e2').then(res=>{
            // console.log(res.data.city.substr(0,2));
            this.setState({
                currC:res.data.city.substr(0,2)
            })
        })
    }
    componentDidMount(){
        axios.get('/api/v4/api/city').then(res=>{
            // console.log(res.data.data.cities);
            this.setState({
                city:res.data.data.cities
            })
        })
        this.currentCity();
    }
    render(){
        return (
            <div className="city">
                <div className="gprs-city" >
                    <div className="city-index-title" >
                        GPS定位你所在城市
                    </div>
                    <div className="city-index-detail" >
                       <span className="currCity">{this.state.currC}</span>
                    
                    </div>
                </div>
                <div className="gprs-city" >
                    <div className="city-index-title" >
                        热门城市
                    </div>
                    <div className="city-index-detail" >
                        <ul className="list-unstyled" >
                        {
                            this.state.hot.map((item,idx)=>{
                                return <li className="city-item-detail" key={idx}><span className="hotcity">{item.name}</span></li>
                            })
                            
                        }
                             
                        </ul>
                    </div>
                </div>
                <div className="gprs-city" >
                    <div className="city-index-title" >
                        按字母排序
                    </div>
                    <div className="city-index-detail" >
                        <ul className="list-unstyled" >
                        {
                            this.state.zimu.map((item,idx)=>{
                                return <li className="city-item-detail" key={idx} ><a href={`#${item}`}
                                className="zimu">{item}</a></li>
                            })
                            
                        }
                             
                        </ul>
                    </div>
                </div>
                <div className="gprs-city" >
                    {
                        this.state.zimu.map((item,idx)=>{
                            return <div key={idx}>
                                <div className="city-index-title" >{item}</div>
                                <div className="city-index-detail" >
                                <ul className="list-unstyled" >
                                    {
                                        this.state.city.map((citem,idx)=>{
                                            if(citem.pinyin.substr(0,1) === item){
                                                 return <li className="city-item-detail" key={idx} id={citem.pinyin.substr(0,1)}><span
                                        className="zimu">{citem.name}</span></li>
                                            }
                                       
                                    })
                                }
                                </ul>
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default City;