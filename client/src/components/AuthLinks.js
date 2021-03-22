import React, { Fragment } from "react";
import { NavItem } from "reactstrap";
import PlayerSearch from "./PlayerSearch";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import "./AppNavBar.css";

function AuthLinks({ isMobile, setIsOpen, name }) {
  return (
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
            <strong>{name ? `Welcome ${name}` : ""}</strong>
          </span>
        </NavItem>
      ) : null}

      <NavItem>
        <Link
          onClick={() => setIsOpen(false)}
          to={`/profile/${name ? name : null}`}
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
}
export default AuthLinks;
