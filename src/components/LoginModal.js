import React from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function LoginModal(props) {

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
					console.log('Login failed');
					let msg = '';
					for (let key in data) {
						msg += key + ': ' + data[key] + '\n'
					}
					alert(msg);
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