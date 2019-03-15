/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import Sidebar from 'components/Sidebar';
import Navebar from 'components/Navebar';
import MainContents from 'components/MainContents';

import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { loginUser, onSaveContents } = this.props;
  }

  updateTool = (id) => {
    console.log(`${id} item activated`);
    this.props.onSetContents(id, {});
  }

  render() {
    const { authentication, currentuser, onLogout, contents } = this.props;

    if (!authentication) {
      return (<Redirect to="login" />);
    } else {
      return (
        <article>
          <Helmet>
            <title>HomePage</title>
            <meta name="description" content="Car recognization system" />
          </Helmet>
        
          <div className="wrapper">
            <Sidebar
              {...this.props}
              onUpdateTool={this.updateTool}
            />

            <div
              className="main-panel"
              ref="mainPanel"
            >
              <Navebar 
                authentication={authentication}
                user={currentuser}
                logout={onLogout}
              />
              <MainContents 
                contents={contents}
              />
            </div>
          </div>
    
        </article>
      );
   }
  }
}

HomePage.propTypes = {
  contents: PropTypes.object,
  loading: PropTypes.bool,
  loginUserinfo: PropTypes.object,
  onSaveContents: PropTypes.func,
  onGetContents: PropTypes.func,
  onSetContents: PropTypes.func,
  onLogout: PropTypes.func,
};
