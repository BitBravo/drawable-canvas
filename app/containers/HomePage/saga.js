import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

import { GET_USER_REQUEST } from 'containers/App/constants';
import { getUserDone, getUserError } from 'containers/App/actions';

import { 
  GET_CONTENTS_REQUEST, SAVE_CONTENTS_REQUEST,
} from 'containers/HomePage/constants';

import { 
  saveContentsDone,
  saveContentsError,
  getContentsDone,
  getContentsError,
} from 'containers/HomePage/actions';

export function* getUser() {
  // Using store value in saga
  // const username = yield select(makeSelectUsername());   
  const requestURL = `https:\\loalhost:3000`;

  try {
    // Call our request helper (see 'utils/request')
    // const userData = yield call(request, requestURL);
    yield put(getUserDone({username: 'Teo', Password: '1234'}));
  } catch (err) {
    yield put(getUserError(err));
  }
}

export function* getContents() {
  const requestURL = `https:\\loalhost:3000`;

  try {
    yield put(getContentsDone({contents: ''}));
  } catch (err) {
    yield put(getContentsError(err));
  }
}

export function* saveContents() {
  // const username = yield select(makeSelectUsername());
  const requestURL = `https:\\loalhost:3000`;

  try {
    yield put(saveContentsDone({contents: {}}));
  } catch (err) {
    yield put(saveContentsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* contentsData() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(GET_CONTENTS_REQUEST, getContents);
  yield takeLatest(SAVE_CONTENTS_REQUEST, saveContents);
}
