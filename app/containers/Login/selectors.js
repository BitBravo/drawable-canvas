/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSetLoginUser = () => createSelector(
  selectUser,
  (userState) => userState.get('loginUser')
);

export {
  selectUser,
  makeSetLoginUser,
};
