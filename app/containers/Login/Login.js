import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class Login extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="login-page">
        <Helmet>
          <title>Login Page</title>
          <meta
            name="description"
            content="Login page of Car recognization System"
          />
        </Helmet>
        <h1>Login Page</h1>
       
      </div>
    );
  }
}
