import * as types from '../actions/actionsTypes';
import R from 'ramda';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  error: null,
  anchor: null
};

export default function anchor(state=initialState, action={}) {
  switch(action.type) {
  case types.REQUEST_ANCHOR:
    return {
      ...state,
      type: action.type,
      error: null,
      isFetching: true,
      didInvalidate: false
    };
  case types.RECEIVE_ANCHOR:
    return {
      ...state,
      type: action.type,
      error: null,
      isFetching: false,
      didInvalidate: false,
      anchor: action.data
    };
  case types.INVALIDATE_ANCHOR:
    return {
      ...state,
      type: action.type,
      error: action.err,
      isFetching: false,
      didInvalidate: true,
      anchor: null
    };
  default:
    return state;
  }
}
