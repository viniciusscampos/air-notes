import * as types from '../actions/actionsTypes';
import R from 'ramda';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  error: null,
  anchor: null,
  position: {x: 0, y: 0, z: 0}
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
      anchor: action.data,
      position: action.position
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
