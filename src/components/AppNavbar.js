import React, { Component } from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AppNavbar extends React.Component {

	render() {
		return (
			<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
				<Navbar className="p-0" bg="light" expand="sm">
					<Navbar.Brand className="">Covid-19 Tracker</Navbar.Brand>
				</Navbar>
			</div>
		)
	}

}

export default AppNavbar;