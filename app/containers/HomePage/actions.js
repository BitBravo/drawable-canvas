
import { 
  GET_CONTENTS_REQUEST, 
  GET_CONTENTS_SUCCESS,
  GET_CONTENTS_ERROR,
  SAVE_CONTENTS_REQUEST,
  SAVE_CONTENTS_SUCCESS,
  SAVE_CONTENTS_ERROR,
} from './constants';

/**
 * Changes of canvas data
 *
 * @param  {name} data HTML Canvas data
 *
 * @return {object}    An action object with a type of SAVE_CONTENTS
 */
export function saveContents(data) {
  return {
    type: SAVE_CONTENTS_REQUEST,
    data
  };
}

export function saveContentsDone(response) {
  return {
    type: SAVE_CONTENTS_SUCCESS,
    response
  };
}

export function saveContentsError(error) {
  return {
    type: SAVE_CONTENTS_ERROR,
    error
  };
}

/**
 *
 * @return {object}    An action object with a type of GET_CONTENTS
 */
export function getContents() {
  return {
    type: GET_CONTENTS_REQUEST,
  };
}

export function getContentsDone(contents) {
  return {
    type: GET_CONTENTS_SUCCESS,
    contents
  };
}

export function getContentsError(error) {
  return {
    type: GET_CONTENTS_ERROR,
    error
  };
}