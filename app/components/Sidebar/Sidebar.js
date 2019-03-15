import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Nav } from "reactstrap";
import {tools} from 'constants/tools'
import mouse from 'images/mouse.png'
import FontAwesome from 'react-fontawesome';

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
    this.state = {
      activedItem: null
    }
    this.activeTool.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeTool(routeName) {
    
  }

  componentWillUnmount() {
    
  }

  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  render() {
    const { contents } = this.props;
   
    return (
      <div className="sidebar" data={'blue'}>
        <div className="sidebar-wrapper" ref="sidebar">
            <div className="logo">
                <LogoText />
            </div>
          <Nav>
            {
              Object.keys(tools).map((itemkey, key) => (
                  <li 
                    className={ contents.activeItem===tools[itemkey].id? 'active':'' }
                    key={key}
                  >
                    <a
                      className="nav-link"
                      onClick={(e) => this.props.onUpdateTool(tools[itemkey].id)}
                    >
                      {/* <i className={item.img} /> */}
                      <p>
                      <span><img src={tools[itemkey].img} /></span>                    
                      {tools[itemkey].name}</p>
                    </a>
                  </li>
                )
              )
            }
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
