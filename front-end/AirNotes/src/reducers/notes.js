import * as types from '../actions/actionsTypes';
import R from 'ramda';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  error: null,
  notes: []
};

export default function note(state=initialState, action={}) {
  switch(action.type) {
  case types.REQUEST_NOTES:
    return {
      ...state,
      type: action.type,
      error: null,
      isFetching: true,
      didInvalidate: false
    };
  case types.RECEIVE_NOTES:
    return {
      ...state,
      type: action.type,
      error: null,
      isFetching: false,
      didInvalidate: false,
      notes: action.data
    };
  case types.INVALIDATE_NOTES:
    return {
      ...state,
      type: action.type,
      error: action.err,
      isFetching: false,
      didInvalidate: true
    };
  case types.ADD_NOTE:
    return {
      ...state,
      type: action.type,
      isFetching: false,
      didInvalidate: false,
      notes: R.concat(state.notes, [action.note])
    };
  default:
    return state;
  }
}
