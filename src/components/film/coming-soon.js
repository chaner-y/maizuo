import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../sass/movie.scss';

import { PullToRefresh, ListView, Button } from 'antd-mobile';

class Comingsoon extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      NUM_ROWS:5,
      pageIndex:0,
      comingdata:[],
    };
  }
  genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < this.state.NUM_ROWS; i++) {
      dataArr.push(`row - ${(pIndex * this.state.NUM_ROWS) + i}`);
    }
    return dataArr;
  }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    axios.get('/api/v4/api/film/coming-soon?page=this.state.pageIndex&count=this.state.NUM_ROWS').then(res=>{
        console.log(res);
        let data0 = res.data.data.films;
        this.setState({
            comingdata:data0
            })
            console.log("now",this.state.comingdata);
    })
    setTimeout(() => {
      this.rData = this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };
  goto(id){

    let {history} = this.props;
    history.push(
        {
            pathname:'/detail',
                id:id
        });
    console.log(history);
  }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...this.genData(++this.state.pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = this.state.comingdata.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.comingdata.length - 1;
      }
      const obj = this.state.comingdata[index--];
      console.log(obj)

      return (
        <div key={rowID}
          style={{
            padding: '0 15px',
          }}
          className="flim-item"
          onClick={this.goto.bind(this,obj.id)}
        >
          <div className="fl">
            <div className="imgs">
                <img src={obj.cover.origin} />
            </div>
            <div className="content">
                <h4>{obj.name}</h4>
                <p>{obj.intro}</p>
                <p><span>{obj.cinemaCount}</span>家影院上映<span className="count">{obj.scheduleCount}</span>人购票</p>
            </div>
            </div>
            <div className="fr">
                <p>{obj.grade}<span>&gt;</span></p>
            </div>
        </div>
      );
    };
    return (<div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    </div>);
  }
}

export default Comingsoon;