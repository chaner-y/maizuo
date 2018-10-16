import React,{Component} from 'react';
import axios from 'axios';
import Item from 'antd-mobile/lib/popover/Item';
import '../../../sass/detail.scss';

class Detail extends Component{
    constructor(props){
        super(props);
        let query = this.props.location.id;
        console.log(11111,query);
        this.state = {
            title:'城市定位',
            Ddata:[],
            id:query
        }
    }
    componentDidMount(){

        axios.get('api/v4/api/film/'+`${this.state.id}`).then(res=>{
            console.log(res.data.data.film,99);
            this.setState({
                Ddata:res.data.data.film
            })
        })
    }
    //时间戳转换
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var D = date.getDate();
        return M+'月'+D+'日';
    }
    render(){
        console.log(1111,this.state.Ddata);
        let {cover,director,actors,nation,language,category,premiereAt,synopsis}=this.state.Ddata;
        actors =Array.isArray(actors) ? actors :[];
        director = director?director:'';
        nation = nation?nation:'';
        language = language?language:'';
        category = category?category:'';
        premiereAt =premiereAt?premiereAt:'';
        synopsis = synopsis?synopsis:'';
        cover = cover?cover:{origin:''};


        return (
            <div className="detail">
            {
                    <div>
                        <img src={cover.origin}/>
                        <div className="contain">
                            <h3>影片简介：</h3>
                            <h6>导演：<span>{director}</span></h6>
                            <h6 className="actors">主演：{actors.map((x,idx)=>{return <span key={idx}>{x.name}</span>})}</h6>
                            <h6>地区语言：<span>{nation}</span><span>({language})</span></h6> 
                            <h6>类型：{category}</h6>
                            <h6>上映日期：<span>{this.timestampToTime(premiereAt)}</span>上映</h6>
                            <p>{synopsis}</p>
                        </div>
                        
                    </div>
            }
            <button className="cpn-primary-button ">立即购票</button>
            </div>
        );
    }
}

export default Detail;