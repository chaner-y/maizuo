import React,{Component} from 'react';
import { Carousel, WingBlank,Button,WhiteSpace} from 'antd-mobile';
import axios from 'axios';
import {withRouter,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import '../sass/home.scss';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            imgHeight: 176,
            sourceData:[1,2,3],
            nowPlay:[],
            coming:[],
          }
    }
    
    getNow(){
        axios.get('api/v4/api/film/now-playing?page=1&count=5').then(res=>{
            // console.log(res);
            let data = res.data.data.films;
            this.setState({
                    nowPlay:data
            })
        // console.log("now",this.state.nowPlay);
            
        })
    }
    getComing(){
        axios.get('api/v4/api/film/coming-soon?page=1&count=3').then(res=>{
            // console.log(res);
            let data = res.data.data.films;
            this.setState({
                    coming:data
                })
                console.log("now",this.state.coming);
        })
    }

    //时间戳转换
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var D = date.getDate();
        return M+'月'+D+'日';
    }
    componentDidMount() {
        axios.get('api/v4/api/billboard/home').then(res=>{
            
            if(res.statusText=="OK"){
            // console.log(111,res.data.data.billboards);
            let data = res.data.data.billboards ;
            if(data.length===1){
                data.push(data[0]);
                data.push(data[0]);
            }else if(data.length<=0){
                return ;
            }
            this.setState({
                sourceData:data
            })

            }
            console.log(this.state.sourceData);
        })
        this.getNow();
        this.getComing();
      }
      goto(id){

        let {history} = this.props;
        history.push(
            {
                pathname:'/detail',
                    id:id
            });
      }
      gohot(){
        let {history} = this.props;
        history.push('/film/now-playing');
      }
      gocoming(){
        let {history} = this.props;
        history.push('/film/coming-soon');
    }
    render(){
        return(
        <div>
           
            <WingBlank>
            <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={10}
            slideWidth={0.8}
            autoplay={true}
            autoplayInterval = {1000}
            infinite
            afterChange={index => this.setState({ slideIndex: index })}
            >
            {this.state.sourceData.map((val, index) => (
                <a
                key={index}
                // href="http://www.alipay.com"
                style={{
                    display: 'block',
                    position: 'relative',
                    top: this.state.slideIndex === index ? -10 : 0,
                    height: this.state.imgHeight,
                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                }}
                >
                <img
                    src={val.imageUrl}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
            ))}
            </Carousel>
            </WingBlank>
            <div className="now-play">
                <ul>
                    {
                        this.state.nowPlay.map((item,idx)=>{
                            return <li key={idx} onClick={this.goto.bind(this,item.id)}>
                                <div>
                                    <div>
                                        <img src={item.cover.origin} />
                                    </div>
                                    <div className="title">
                                        <div className="fl">
                                            <h6>{item.name}</h6>
                                            <p><span>{item.cinemaCount}</span>家影院上映<span>{item.scheduleCount}</span>人购票</p>
                                        </div>
                                        <h3 className="fr">{item.grade}</h3>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="more-button" onClick={this.gohot.bind(this)}>更多热映电影</div>
            <div className="dividing-line"><div className="upcoming" >即将上映</div></div>
            <div className="now-play">
                <ul>
                    {
                        this.state.coming.map((item,idx)=>{
                            return <li key={idx}  onClick={this.goto.bind(this,item.id)}>
                                <div>
                                    <div>
                                        <img src={item.cover.origin} />
                                    </div>
                                    <div className="title">
                                        <div className="fl">
                                            <h6>{item.name}</h6>
                                        </div>
                                        <p className="fr">{this.timestampToTime(item.premiereAt)}上映</p>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="more-button"onClick={this.gocoming.bind(this)}>更多即将上映电影</div>
            {/* <Switch>
                <Route path="/detail" component={MyCity} exact/>
            </Switch> */}
      </div>
        )
    }
}

// let mapStateToProps = function(state){
//     //state为保存在store中的数据
//     return {
//         id:state.detailReducer.data.id
//     }
// }

// let mapDispatchToProps = function(dispatch){
//     return {
//         Edetail:(id)=>{
//             dispatch({
//                 type:'GET_ID',
//                 payload:id
//             })
//         }
//     }
// }
// Home = connect(mapStateToProps)(Home);

Home = withRouter(Home)
export default Home;