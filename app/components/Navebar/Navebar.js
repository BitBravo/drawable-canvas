import React from "react";
import { Link } from 'react-router-dom'
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal
} from "reactstrap";
import './style.scss';


class Navebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    const { authentication, user } = this.props;
    return (
      <>
        <Navbar
          className={"navbar-absolute"}
          expand="lg"
        >
          <Container fluid>
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <span className='username'>{user.username}</span>
                    <div className="photo">
                      <img alt="..." src={authentication? require("images/user.png") : require("images/default-avatar.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem 
                        className="nav-item"
                        onClick={this.props.logout}
                      >
                          Log out
                      </DropdownItem>

                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navebar;
