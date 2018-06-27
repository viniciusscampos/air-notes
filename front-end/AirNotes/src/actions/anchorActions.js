import * as types from './actionsTypes';
import R from 'ramda';
import { get, post, put } from '../api/api';
import { receiveNotes } from './noteActions';

function requestAnchor() {
  return {
    type: types.REQUEST_ANCHOR
  };
}

function receiveAnchor(data) {
  alert(data.toString());
  return {
    type: types.RECEIVE_ANCHOR,
    data
  };
}

function invalidateAnchor(err) {
  alert(err.toString());
  return {
    type: types.INVALIDATE_ANCHOR,
    err
  };
}

export function addAnchor(data) {
  return (dispatch, getState) => {
    const postData = {
      ...data,
      status: 'acorip',
      notes: []
    };
    console.log(postData);
    post('/anchor/create', postData)
      .then(doc => doc.json())
      .then(doc => {
        console.log(doc);
        getAnchor(doc);
      })
      .catch(err => {
        console.log(err);
        dispatch(invalidateAnchor(err));
      });
  };
}

export function getAnchor(id) {
  return (dispatch, getState) => {
    dispatch(requestAnchor());
    get('/anchor/get/', {anchor: id})
      .then(doc => {
        console.log(doc);
        dispatch(receiveAnchor(R.omit('notes', doc)));
        dispatch(receiveNotes(doc.notes));
      })
      .catch(err => dispatch(invalidateAnchor(err)));
  };
}
