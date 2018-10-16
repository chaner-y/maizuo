import { Switch } from "antd-mobile";

let detailPage ={
    data:[
        {
            id:1111,
        }
    ]
}

//指定state修改逻辑
//根据不同的action操作旧的state
const reducer = function(state=detailPage,action){
    switch(action.type){
        //根据id
        case 'GET_ID':
            return {
                ...state,
                data:[...state.data,action.payload]
            }
        default:
            return state;
    }
}

export default reducer;