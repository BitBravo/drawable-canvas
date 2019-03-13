/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentuser: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('currentuse', false);
    case GET_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('currentuser', action.user);
    case GET_USER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
