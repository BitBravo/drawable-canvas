import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';

import { LOGIN_REQUEST } from './constants';
import { loginDone, loginError } from './actions';

export function* userLogin() {
  // Using store value in saga
  // const username = yield select(makeSelectUsername());   
  const requestURL = `https:\\loalhost:3000`;

  try {
    // Call our request helper (see 'utils/request')
    // const userData = yield call(request, requestURL);
    yield put(loginDone({username: 'Teo', Password: '1234'}));
  } catch (err) {
    yield put(loginError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* contentsData() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN_REQUEST, userLogin);

}
