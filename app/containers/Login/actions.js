
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

/**
 *
 * @return {object}    An action object with a type of GET_CONTENTS
 */
export function userLogin(user) {
  return {
    type: LOGIN_REQUEST,
    user
  };
}

export function loginDone(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}