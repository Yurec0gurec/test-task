import { combineReducers } from 'redux';
import photoReducer from './photo';

export default combineReducers({
  photos: photoReducer
})
