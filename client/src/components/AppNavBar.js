import React, { useState, useEffect, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import PlayerSearch from "./PlayerSearch";
import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import DemoUserLogin from "./auth/DemoUserLogin";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import "./AppNavBar.css";

function AppNavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const showSearch = () => {
    if (window.innerWidth <= 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    showSearch();
  }, []);

  window.addEventListener("resize", showSearch);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <Fragment>
      {isMobile ? (
        <Link
          onClick={() => setIsOpen(false)}
          to="/search"
          className={"nav-link"}
        >
          Search
        </Link>
      ) : (
        <NavItem style={{ listStyleType: "none" }}>
          <PlayerSearch />
        </NavItem>
      )}
      {!isMobile ? (
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
      ) : null}

      <NavItem>
        <Link
          onClick={() => setIsOpen(false)}
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
      {isMobile ? (
        <Link
          onClick={() => setIsOpen(false)}
          to="/search"
          className={"nav-link"}
        >
          Search
        </Link>
      ) : (
        <NavItem style={{ listStyleType: "none" }}>
          <PlayerSearch />
        </NavItem>
      )}
      <NavItem onClick={() => setIsOpen(false)}>
        <RegisterModal />
      </NavItem>
      <NavItem onClick={() => setIsOpen(false)}>
        <LoginModal />
      </NavItem>
      <NavItem onClick={() => setIsOpen(false)}>
        <DemoUserLogin />
      </NavItem>
    </Fragment>
  );
  return (
    <Navbar color="dark" dark expand="sm">
      <Container>
        {}
        <NavItem className="nav-brand" style={{ listStyleType: "none" }}>
          <Link to="/" className={"nav-link"} style={{ color: "white" }}>
            Poker Tracker
          </Link>
        </NavItem>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavBar);
