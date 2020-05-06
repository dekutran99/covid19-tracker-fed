import React from "react";
import {
	Navbar,
	Nav,
	Modal,
	Button,
	Form,
	Row,
	Col,
	InputGroup
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function RegisterModal(props) {

	const [user, setUser] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

	async function register(evt) {

		// let url = "http://127.0.0.1:8000/"
		let url = "https://covid-19-tracker-276100.wl.r.appspot.com/"
		let path = "auth/register"


		// Getting login authorization from api.codegram.dev
		let myHeaders = new Headers();

		let raw = {
			username: user,
			email: email,
			password: pass
		}

		let body = JSON.stringify(raw)

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: body,
			redirect: 'follow',
			credentials: 'include'
		};

		// indicate where there is error in request
		let error;

		await fetch(url + path, requestOptions)
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
					console.log('Sign up successful')
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

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			register();
		}
	}

	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<strong>Create an account</strong>
			</Modal.Header>
			<Modal.Body>
				<Form role="form">
					<Form.Group>
						<InputGroup className="input-group-alternative mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="ni ni-circle-08" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Username"
								type="text"
								onChange={e => setUser(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="input-group-alternative mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="ni ni-email-83" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Email"
								type="email"
								onChange={e => setEmail(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="input-group-alternative">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="ni ni-lock-circle-open" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Password"
								type="password"
								autoComplete="off"
								onChange={e => setPass(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Row className="my-1">
						<Col xs="12">
							<div className="custom-control custom-control-alternative custom-checkbox">
								<input
									className="custom-control-input"
									id="customCheckRegister"
									type="checkbox"
								/>
								<label
									className="custom-control-label"
									htmlFor="customCheckRegister"
								>
									<span>
										I agree with the{" "}
										<a
											href="www.google.com"
										>
											Privacy Policy
                                  		</a>
									</span>
								</label>
							</div>
						</Col>
					</Row>
					<div className="text-center">
						<Button
							className="mt-4 mb-0"
							variant="primary"
							type="button"
							onClick={register}
						>
							Sign up
                        </Button>
					</div>
				</Form>
			</Modal.Body>

		</Modal>
	);
}


function LoginModal(props) {

	const [user, setUser] = React.useState('');
	const [pass, setPass] = React.useState('');

	async function signIn(evt) {

		// let url = "http://127.0.0.1:8000/"
		let url = "https://covid-19-tracker-276100.wl.r.appspot.com/"
		let path = "auth/login"


		// Getting login authorization from api.codegram.dev
		let myHeaders = new Headers();

		let raw = {
			"username": user,
			"password": pass
		}

		let body = JSON.stringify(raw)

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: body,
			redirect: 'follow',
			credentials: 'include'
		};

		// indicate where there is error in request
		let error;

		await fetch(url + path, requestOptions)
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

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			signIn();
		}
	}


	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<strong>Sign in</strong>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form role="form">
					<Form.Group className="mb-3">
						<InputGroup className="input-group-alternative">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="ni ni-circle-08" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Username"
								type="text"
								onChange={e => setUser(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="input-group-alternative">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="ni ni-lock-circle-open" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Password"
								type="password"
								autoComplete="off"
								onChange={e => setPass(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<div className="custom-control custom-control-alternative custom-checkbox">
						<input
							className="custom-control-input"
							id=" customCheckLogin"
							type="checkbox"
						/>
						<label
							className="custom-control-label"
							htmlFor=" customCheckLogin"
						>
							<span>Remember me</span>
						</label>
					</div>
					<div className="text-center">
						<Button
							className="mt-4 mb-0"
							variant="primary"
							size="sm"
							type="button"
							onClick={signIn}
						>
							Sign in
                        </Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

function AppNavbar() {

	const [login, setLogin] = React.useState(false);
	const [register, setRegister] = React.useState(false);

	return (

		<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
			<Navbar className="p-0" bg="light" expand="sm">
				<Navbar.Brand className="pl-2">Covid-19 Tracker</Navbar.Brand>
				<Nav className="justify-content-end" style={{ width: "100%" }}>
					<Button variant="primary" onClick={() => setLogin(true)}>
						Login
      				</Button>
					<LoginModal
						show={login}
						onHide={() => setLogin(false)}
					/>
					<Button variant="primary" onClick={() => setRegister(true)}>
						Register
      				</Button>
					<RegisterModal
						show={register}
						onHide={() => setRegister(false)}
					/>
				</Nav>
			</Navbar>
		</div>
	)

}

export default AppNavbar;