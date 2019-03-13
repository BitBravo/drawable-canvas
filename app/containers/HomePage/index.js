import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSetContents } from './selectors';
import { makeSelectCurrentUser } from '../App/selectors';
import { saveContents, getContents } from './actions';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onSaveContents: (data) => dispatch(saveContents(data)),
  onGetContents: () => dispatch(getContents()),
});

const mapStateToProps = createStructuredSelector({
  currentuser: makeSelectCurrentUser(),
  contents: makeSetContents()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
