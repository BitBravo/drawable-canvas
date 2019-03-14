/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';

/**
 * Get the user info, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_USER_REQUEST
 */
export function getUser() {
  return {
    type: GET_USER_REQUEST,
  };
}

/**
 * Dispatched when the user info are requested by the request saga
 *
 * @return {object}     
 */
export function getUserDone(user, authentication) {
  return {
    type: GET_USER_SUCCESS,
    user,
    authentication,
  };
}

/**
 * Dispatched when  the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}     
 */
export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}
