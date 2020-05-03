import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

class AppNavbar extends React.Component {
  render() {
    return (
      <div className="" style={{ width: "100%", position: "fixed", zIndex: 5 }}>
        <Navbar className="p-0" bg="light" expand="sm">
          <Navbar.Brand className="pl-2">Covid-19 Tracker</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <LoginModal />{" "}
			  <SignUpModal />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
