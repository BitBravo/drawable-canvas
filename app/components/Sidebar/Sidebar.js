import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Nav } from "reactstrap";
import {tools} from 'constants/tools'

import './style.scss';

const LogoImg = (img) => (
    <a
      className="simple-text logo-mini"
    >
      <div className="logo-img">
        <img src={img} alt="react-logo" />
      </div>
    </a>
);

const LogoText = (text) => (
    <a
      className="simple-text logo-normal"
    >
      <i className='tim-icons icon-settings'></i>
      <span>Tools</span>
    </a>
)

class Sidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  render() {
    const { bgColor, routes, rtlActive, logo } = this.props;
   
    return (
      <div className="sidebar" data={'blue'}>
        <div className="sidebar-wrapper" ref="sidebar">
            <div className="logo">
              {/* {logoImg} */}
              <LogoText />
            </div>
          <Nav>
            {tools.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    key===1? 'active':''  +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={'/'}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
