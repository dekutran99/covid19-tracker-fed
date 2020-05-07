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


function RegisterModal(props) {

	const [user, setUser] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

	async function register(evt) {

		// let url = "http://127.0.0.1:8000/"
		let url = "https://apic19gt.tranquanghuy.me/"
		let path = "auth/register"

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
									<i className="fa" />
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
									<i className="fa" />
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
									<i className="fa" />
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
		let url = "https://apic19gt.tranquanghuy.me/"
		let path = "auth/login"

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
									<i className="fa" />
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
									<i className="fa" />
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
	const [authStatus, setAuthStatus] = React.useState(null);

	React.useEffect((e) => {
		async function checkLoginStatus() {

			// let url = "http://127.0.0.1:8000/"
			let url = "https://apic19gt.tranquanghuy.me/"
			let path = "auth/user"

			let myHeaders = new Headers();


			let requestOptions = {
				method: 'POST',
				headers: myHeaders,
				redirect: 'follow',
				credentials: 'include'
			}

			let error;

			await fetch(url + path, requestOptions)
				.then(response => {
					if (response.ok) {
						error = false;
					} else {
						error = true;
					}
					return response.json();
				}
				)
				.then(result => {
					if (error === false) {
						setAuthStatus(true);
					} else {
						setAuthStatus(false);
					}
				})
				.catch(error => console.log('error', error));

		}
		checkLoginStatus();
	});

	async function logOut() {
		// let url = "http://127.0.0.1:8000/"
		let url = "https://apic19gt.tranquanghuy.me/"
		let path = "auth/logout"

		let myHeaders = new Headers();


		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow',
			credentials: 'include'
		}

		await fetch(url + path, requestOptions)
			.catch(error => console.log('error', error));

		window.location.reload();
	}

	if (authStatus == null) {
		return (
			<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
				<Navbar className="p-0" bg="light" expand="sm">
					<Nav className="mx-auto">
						<strong>Please wait why we check if you are logged in.</strong>
					</Nav>
				</Navbar>
			</div>
		)
	} else if (authStatus === false) {
		return (
			<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
				<Navbar className="p-0" bg="light" expand="sm">
					<Row className="m-auto" style={{ width: "100%" }}>
						<Col className="px-0">
							<Navbar.Brand className="pl-2 mr-0">Covid-19 Tracker</Navbar.Brand>
						</Col>
						<Col className="px-0 d-none d-md-block">
						</Col>
						<Col className="m-auto px-0">
							<Nav className="justify-content-end" style={{ width: "100%", float: "right" }}>
								<div className="px-1" style={{ maxWidth: "60px" }}>
									<Button variant="primary" size="sm" onClick={() => setLogin(true)}>
										Login
									  </Button>
									<LoginModal
										show={login}
										onHide={() => setLogin(false)}
									/>
								</div>
								<div className="px-1 pr-2">
									<Button variant="primary" size="sm" onClick={() => setRegister(true)}>
										Register
									</Button>
									<RegisterModal
										show={register}
										onHide={() => setRegister(false)}
									/>
								</div>
							</Nav>
						</Col>
					</Row>
				</Navbar>
			</div>
		);
	} else {
		return (
			<div className="" style={{ width: '100%', position: "fixed", zIndex: 5 }}>
				<Navbar className="p-0" bg="light" expand="sm">
					<Row className="m-auto" style={{ width: "100%" }}>
						<Col className="px-0">
							<Navbar.Brand className="pl-2 mr-0">Covid-19 Tracker</Navbar.Brand>
						</Col>
						<Col className="px-0 d-none d-md-block">
						</Col>
						<Col className="m-auto px-0">
							<Nav className="justify-content-end" style={{ width: "100%", float: "right" }}>
								<div className="px-1 pr-2">
									<Button variant="primary" size="sm" onClick={logOut}>
										Sign out
									</Button>
								</div>
							</Nav>
						</Col>
					</Row>
				</Navbar>
			</div>
		);
	}

}

export default AppNavbar;