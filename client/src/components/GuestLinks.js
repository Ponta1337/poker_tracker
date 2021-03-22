import React, { Fragment } from "react";
import { NavItem } from "reactstrap";
import PlayerSearch from "./PlayerSearch";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import DemoUserLogin from "./auth/DemoUserLogin";
import { Link } from "react-router-dom";

export function GuestLinks({ isMobile, setIsOpen }) {
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
}
