import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import PlayerSearch from "./PlayerSearch";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import DemoUserLogin from "./auth/DemoUserLogin";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import "./AppNavBar.css";

class AppNavBar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `${user.name}` : ""}</strong>
          </span>
        </NavItem>

        <NavItem>
          <Link
            to={`/profile/${user ? user.name : null}`}
            className={"nav-link"}
          >
            My Profile
          </Link>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <DemoUserLogin />
        </NavItem>
      </Fragment>
    );
    return (
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavItem style={{ listStyleType: "none" }}>
            <NavbarBrand>
              <Link to="/" className={"nav-link"} style={{ color: "white" }}>
                Poker Tracker
              </Link>
            </NavbarBrand>
          </NavItem>
          <NavItem style={{ listStyleType: "none" }}>
            <PlayerSearch />
          </NavItem>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavBar);
