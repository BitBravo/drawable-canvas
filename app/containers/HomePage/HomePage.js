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
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.elements = {}
  }
  componentDidMount() {
    const { loginUser, onSaveContents } = this.props;
  }

  componentWillReceiveProps(nextprops) {
    if(nextprops.notification !== this.elements) {
      this.elements = nextprops.notification;
      if(nextprops.notification.status === 200) {
        this.createNotification('success', nextprops.notification.msg);
      } else {
        this.createNotification('error', nextprops.notification.msg);
      }
    }
  }

  updateTool = (id) => {
    console.log(`${id} item activated`);
    this.props.onSetContents(id, {});
  }

  createNotification = (type, text) => {
    switch (type) {
      case 'info':
        NotificationManager.info(text);
        break;
      case 'success':
        NotificationManager.success(text, '');
        break;
      case 'warning':
        NotificationManager.warning('text', '', 3000);
        break;
      case 'error':
        NotificationManager.error(text, '', 5000, () => {
          alert('callback');
        });
        break;
    }
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
            {/* <Sidebar
              {...this.props}
              onUpdateTool={this.updateTool}
            /> */}

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
                createNotification={this.createNotification}
                onSaveContents={this.props.onSaveContents}
              />
            </div>
          </div>
          <NotificationContainer />
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
