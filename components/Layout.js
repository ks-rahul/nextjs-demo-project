import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import Link from "./CustomLink";

import CustomHead from "./head";
import actions from "../redux/actions";

import styles from "../styles/Home.module.css";

const Layout = ({
  children,
  title,
  isAuthenticated,
  deauthenticate,
  reauthenticate,
}) => {
  useEffect(() => {
    let tc = localStorage.getItem("token");
    if (tc) {
      reauthenticate(tc);
    }
  }, [reauthenticate]);

  return (
    <Fragment>
      <CustomHead title={title} />

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
            {!isAuthenticated && (
              <Link href="/signin">
                <a className="nav-link">Sign In</a>
              </Link>
            )}
            {!isAuthenticated && (
              <Link href="/signup">
                <a className="nav-link">Sign Up</a>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/users">
                <a className="nav-link">Users</a>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/blog">
                <a className="nav-link">blog</a>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/profile">
                <a className="nav-link">Profile</a>
              </Link>
            )}
            {isAuthenticated && (
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  deauthenticate();
                }}
                href="#"
              >
                <span>Sign Out</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main className="has-text-centered">{children}</main>

      <footer className={`${styles.footer} bg-light`}>
        Copyrights &copy; 2021.
      </footer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(Layout);
