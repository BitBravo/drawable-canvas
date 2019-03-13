/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSetContents = () => createSelector(
  selectHome,
  (homeState) => homeState.get('contents')
);

export {
  selectHome,
  makeSetContents,
};
