import { combineReducers } from 'redux';
import bases from './bases';
import config from './config';

const rootReducer = combineReducers({
  bases, config,
});

export default rootReducer;
