import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AppNavBar.css";
import AuthLinks from "./AuthLinks";
import { GuestLinks } from "./GuestLinks";

function AppNavBar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    const handleResize = throttle(() => {
      onResize();
    }, 700);

    window.addEventListener("resize", handleResize);
    onResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="dark" dark expand="sm">
      <Container>
        <NavItem className="nav-brand" style={{ listStyleType: "none" }}>
          <Link to="/" className={"nav-link"} style={{ color: "white" }}>
            Poker Tracker
          </Link>
        </NavItem>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <AuthLinks
                name={user.name}
                isMobile={isMobile}
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
              />
            ) : (
              <GuestLinks
                isMobile={isMobile}
                setIsOpen={() => setIsOpen(false)}
              />
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavBar;
