// export { default } from './Login';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSetLoginUser } from './selectors';
import { makeSelectCurrentUser } from '../App/selectors';
import { userLogin } from './actions';
import reducer from './reducer';
import saga from './saga';
import Login from './Login';

const mapDispatchToProps = (dispatch) => ({
  onUserLogin: (user) => dispatch(userLogin(user)),
});

const mapStateToProps = createStructuredSelector({
  loginUser: makeSetLoginUser(),
  currentuser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(withReducer, withSaga, withConnect)(Login);
export { mapDispatchToProps };
