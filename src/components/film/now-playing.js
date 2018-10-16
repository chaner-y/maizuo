import React,{Component} from 'react';
import axios from 'axios';
import {PullToRefresh} from 'antd-mobile';
import '../../sass/movie.scss';

class Nowplaying extends Component{
    constructor(){
        super();
        this.state = {
            nowdata:[],
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        }
    }
    goto(id){

        let {history} = this.props;
        history.push(
            {
                pathname:'/detail',
                    id:id
            });
        console.log(history);
      }
    componentDidMount(){
        axios.get('/api/v4/api/film/now-playing?page=1&count=7').then(res=>{
            console.log(res);
            let data = res.data.data.films;
            this.setState({
                nowdata:data
                })
                console.log("now",this.state.nowdata);
        })
    }
    render(){
        return (
            <div>
               <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                    height: this.state.height,
                    overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                    }, 1000);
                    }}
                >
                    <ul>
                        {this.state.nowdata.map((item,idx) => {
                            return <li key={item.id} className="flim-item" onClick={this.goto.bind(this,item.id)}>
                                <div className="fl">
                                    <div className="imgs">
                                        <img src={item.cover.origin} />
                                    </div>
                                    <div className="content">
                                        <h4>{item.name}</h4>
                                        <p>{item.intro}</p>
                                        <p><span>{item.cinemaCount}</span>家影院上映<span className="count">{item.scheduleCount}</span>人购票</p>
                                    </div>
                                </div>
                                <div className="fr">
                                    <p>{item.grade}<span>&gt;</span></p>
                                </div>
                            </li>

                        })}
                    </ul>
                   
                </PullToRefresh>
            </div>
        );
    }
}
export default Nowplaying;