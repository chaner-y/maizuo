import { combineReducers } from 'redux';

import detailReducer from './detailReducer';

// 合并成一个Reducer

const rootReducer = combineReducers({
	detailReducer,
	// goodsReducer
});

export default rootReducer;