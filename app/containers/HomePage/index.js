import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectCurrentUser, makeSelectAuthentication } from '../App/selectors';
import { getUser } from '../App/actions';

import { makeSetContents } from './selectors';
import { saveContents, getContents } from './actions';

import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: () => dispatch(getUser()),
  onSaveContents: (data) => dispatch(saveContents(data)),
  onGetContents: () => dispatch(getContents()),
});

const mapStateToProps = createStructuredSelector({
  currentuser: makeSelectCurrentUser(),
  authentication: makeSelectAuthentication(),
  contents: makeSetContents()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
