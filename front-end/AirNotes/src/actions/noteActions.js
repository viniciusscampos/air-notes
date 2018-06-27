import * as types from './actionsTypes';
import { get, post, put } from '../api/api';
import R from 'ramda';

function requestNotes() {
  return {
    type: types.REQUEST_NOTES
  };
}

export function receiveNotes(data) {
  return {
    type: types.RECEIVE_NOTES,
    data
  };
}

function invalidateNotes(err) {
  return {
    type: types.INVALIDATE_NOTES,
    err
  };
}

function addNote(note) {
  return {
    type: types.ADD_NOTE,
    note
  };
}

export function publishNote(data) {
  return(dispatch, getState) => {
    const { anchor, note } = getState();
    const postData = {
      ...anchor,
      notes: R.concat(note.notes, [data])
    };
    console.log(postData);
    post('/anchor/update', postData)
      .then(doc =>{
        console.log(doc);
        dispatch(addNote(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(invalidateNotes(err));
      });
  };
}

export function fetchNotes(query) {
  return (dispatch, getState) => {
    get('/note')
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(receiveNotes(json));
      })
      .catch(err => dispatch(invalidateNotes(err)));
  };
}
