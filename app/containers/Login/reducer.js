/*
 * HomeReducer
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
  LOGIN_REQUEST, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  loginUser: {}
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('loginUser', {})
        .set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('loginUser', action.user)
        .set('error', false);
    case LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default userReducer;
