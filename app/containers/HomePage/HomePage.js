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

import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { loginUser, onSaveContents } = this.props;
  }

  render() {
    const {
      loading, loginUserinfo, onSaveContents, authentication,
    } = this.props;

    if (authentication) {
      return (<Redirect to="login" />);
    } else {
      return (
        <article>
          <Helmet>
            <title>Login Page</title>
            <meta name="description" content="Car recognization system" />
          </Helmet>
        
          <div className="wrapper">
            <Sidebar
              // {...this.props}
              // routes={routes}
              // bgColor={this.state.backgroundColor}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: 'logo'
              }}
              // toggleSidebar={this.toggleSidebar}
            />
            <div
              className="main-panel"
              ref="mainPanel"
              // data={this.state.backgroundColor}
            >
              <Navebar
                // brandText={this.getBrandText(this.props.location.pathname)}
                // toggleSidebar={this.toggleSidebar}
                // sidebarOpened={this.state.sidebarOpened}
              />
              {/* <Switch>{this.getRoutes(routes)}</Switch> */}
              {/* {// we don't want the Footer to be rendered on map page
              this.props.location.pathname.indexOf("maps") !== -1 ? null : (
                <Footer fluid />
              )} */}
            </div>
          </div>
    
        </article>
      );
   }
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  loginUserinfo: PropTypes.object,
  onSaveContents: PropTypes.func
};
