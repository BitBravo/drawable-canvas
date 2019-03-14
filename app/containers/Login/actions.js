
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

/**
 *
 * @return {object}    An action object with a type of GET_CONTENTS
 */
export function userLogin(loginUser) {
  return {
    type: LOGIN_REQUEST,
    loginUser
  };
}

export function loginDone(loginUser) {
  return {
    type: LOGIN_SUCCESS,
    loginUser
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}