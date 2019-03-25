import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectCurrentUser, makeSelectAuthentication } from '../App/selectors';
import { getUser, logOut } from '../App/actions';

import { makeSetContents, makeSetLoading, makeSetMsg } from './selectors';
import { saveContents, getContents, setContents } from './actions';

import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: () => dispatch(getUser()),
  onSaveContents: (data) => dispatch(saveContents(data)),
  onGetContents: () => dispatch(getContents()),
  onSetContents: (activeItem, itemData) => dispatch(setContents(activeItem, itemData)),
  onLogout: () => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
  currentuser: makeSelectCurrentUser(),
  authentication: makeSelectAuthentication(),
  contents: makeSetContents(),
  loading: makeSetLoading(),
  notification: makeSetMsg(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
