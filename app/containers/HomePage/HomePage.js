/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { loginUser, onSaveContents } = this.props;
  }

  render() {
    const {
      loading, loginUser, onSaveContents,
    } = this.props;
    console.log(this.props)
    if (loginUser) {
      return (<Redirect to="login" />);
    } else {
      return (
        <article>
          <Helmet>
            <title>Login Page</title>
            <meta name="description" content="Car recognization system" />
          </Helmet>
        
          <div className="home-page">
            <h1>Home page</h1>
          </div>
        </article>
      );
   }
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  loginUser: PropTypes.object,
  onSaveContents: PropTypes.func
};
