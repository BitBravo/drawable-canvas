/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSetContents = () => createSelector(
  selectHome,
  (homeState) => homeState.get('contents').toJS()
);

const makeSetLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSetMsg = () => createSelector(
  selectHome,
  (homeState) => homeState.get('notification')
);

export {
  selectHome,
  makeSetContents,
  makeSetLoading,
  makeSetMsg,
};
