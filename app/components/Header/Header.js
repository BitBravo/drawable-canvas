import React from 'react';
import Logo from '../Logo'
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <Logo />
      </div>
    );
  }
}

export default Header;
