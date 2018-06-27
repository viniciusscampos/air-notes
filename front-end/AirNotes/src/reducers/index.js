import { combineReducers } from 'redux';
import note from './notes';
import anchor from './anchor';

export default combineReducers({
  note,
  anchor
});
