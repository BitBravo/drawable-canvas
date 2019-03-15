import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextprops) {
  }

  shouldComponentUpdate() {
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    event.preventDefault();
    const formData = {};
      for (const data in this.refs) {
        formData[data] = this.refs[data].value;
      }

    this.props.onUserLogin(formData)
  }

  render() {
    if (this.props.loginUser.authentication && this.props.currentuser) {
      return <Redirect to='/' />
    } else {
      return (
        <div className="login-page">
          <Helmet>
            <title>Login Page</title>
            <meta
              name="description"
              content="Login page of Car recognization System"
            />
          </Helmet>
  
          <div className="grid align__item">
            <div className="register">
              <h2>Login</h2>
              <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form__field">
                  <input type="email" ref="email" placeholder="info@mailaddress.com" />
                </div>
  
                <div className="form__field">
                  <input type="password" ref="password" placeholder="••••••••••••" />
                </div>
  
                <div className="form__field">
                  <input type="submit" value="Login" />
                </div>
              </form>
              <p>Don't you have an accout? <Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
      );
    }
  }
}

Login.propTypes = {
  loading: PropTypes.bool,
  loginUser: PropTypes.object,
  onUserLogin: PropTypes.func
};

