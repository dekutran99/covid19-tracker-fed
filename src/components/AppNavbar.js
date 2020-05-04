import React from "react";
import {
	Navbar,
	Nav,
	Modal,
	Button,
	Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyVerticallyCenteredModal(props) {

	const [user, setUser] = React.useState('');
	const [pass, setPass] = React.useState('');

	async function handleSubmit(evt) {
		evt.preventDefault();

		// Getting login authorization from api.codegram.dev
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");

		let username = `${user}`
		let password = `${pass}`
		
		let raw = "{\n	\"username\": \"" + username + "\",\n	\"password\": \"" + password + "\"\n}";

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			credentials: 'include'
		};

		// indicate where there is error in request
		let error;

		await fetch("http://127.0.0.1:8000/auth/login", requestOptions)
			.then(response => {
				if (!response.ok) {
					error = true;
				} else {
					error = false;
				}
				return response.json();
			})
			.then(data => {
				if (error === false) {
					console.log('Logged in')
				} else if (error === true) {
					console.log('Failed');
					console.log(data);
				}
			})
			.catch(
				error => console.log('error', error)
			);
		
		props.onHide();
		window.location.reload();
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
		  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="loginUserName">
						<Form.Label>User Name</Form.Label>
						<Form.Control
							onChange={e => setUser(e.target.value)}
							placeholder="Enter user name"
						/>
					</Form.Group>

					<Form.Group controlId="loginPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={e => setPass(e.target.value)}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Keep me logged in" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
            		</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

// class AppNavbar extends React.Component {

// 	render() {
// 		return (

// 			<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
// 				<Navbar className="p-0" bg="light" expand="sm">
// 					<Navbar.Brand className="pl-2">Covid-19 Tracker</Navbar.Brand>
// 					<Nav className="justify-content-end" style={{ width: "100%" }}>

// 					</Nav>
// 				</Navbar>
// 			</div>
// 		)
// 	}

// }

function AppNavbar() {
	const [modalShow, setModalShow] = React.useState(false);
	return (

		<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
			<Navbar className="p-0" bg="light" expand="sm">
				<Navbar.Brand className="pl-2">Covid-19 Tracker</Navbar.Brand>
				<Nav className="justify-content-end" style={{ width: "100%" }}>
					<Button variant="primary" onClick={() => setModalShow(true)}>
						Login
      				</Button>
					<MyVerticallyCenteredModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				</Nav>
			</Navbar>
		</div>
	)

}

export default AppNavbar;