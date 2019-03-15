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

export {
  selectHome,
  makeSetContents,
  makeSetLoading,
};
