import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Badge from 'react-bootstrap/Badge';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UpdateTestRecordModal from './UpdateTestRecordModal'


function AppNavbar() {

	const [login, setLogin] = React.useState(false);
	const [register, setRegister] = React.useState(false);
	const [updateTestRecord, setUpdateTestRecord] = React.useState(false);
	const [authStatus, setAuthStatus] = React.useState(null);
	const [badgeVariant, setBadgeVariant] = React.useState('');
	const [testRecordJson, setTestRecordJson] = React.useState({});
	const [badgeText, setBadgeText] = React.useState('');
	const [fetchDone, setFetchDone] = React.useState(false);

	React.useEffect(() => {

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

			await fetch(url + path, requestOptions)
				.then(response => {
					if (response.ok) {
						setAuthStatus(true);
					} else {
						setAuthStatus(false);

					}
				})
				.catch(error => console.log('error', error));

		}

		async function getTestRecord() {

			// let url = "http://127.0.0.1:8000/";
			let url = "https://apic19gt.tranquanghuy.me/";
			let path = "logs/teststatus/";

			let myHeaders = new Headers();

			let requestOptions = {
				method: 'GET',
				headers: myHeaders,
				redirect: 'follow',
				credentials: 'include'
			};

			let status;

			await fetch(url + path, requestOptions)
				.then(response => {
					if (response.status === 200) {
						status = 200;
						return response.json();
					} else if (response.status === 204) {
						status = 204;
					}
				}).then(data => {
					if (status === 200) {
						setTestRecordJson(data);
						if (data.positive === true) {
							setBadgeVariant("warning");
							setBadgeText("Date tested: " + Object.values(data)[0]);
						} else if (data.positive === false) {
							setBadgeVariant("success");
							setBadgeText("Date tested: " + Object.values(data)[0]);
						}
					} else if (status === 204) {
						setTestRecordJson(
							{
								status: "No record of COVID-19 postive test."
							}
						);
						setBadgeVariant("info");
						setBadgeText("No record of COVID-19 postive test.");
					}
				})
				.catch(error => console.log('error', error));

		}

		checkLoginStatus();
		getTestRecord();
		setFetchDone(true);

	}, [fetchDone]);

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
						<strong>Please wait while we check if you are logged in.</strong>
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
							<Navbar.Brand className="pl-2 mr-0">
								<strong>Covid-19 Tracker</strong>{" "}
								<small>(right click to add marker)</small>{" "}
								<Badge pill variant={badgeVariant} size='sm'>{badgeText}</Badge>
							</Navbar.Brand>
						</Col>
						<Col className="px-0 d-none d-md-block">
						</Col>
						<Col className="m-auto px-0">
							<Nav className="justify-content-end" style={{ width: "100%", float: "right" }}>
								<div className="px-1 pr-2">
									<Button variant='info' size='sm' onClick={() => setUpdateTestRecord(true)}>Update test record</Button>{" "}
									<UpdateTestRecordModal
										show={updateTestRecord}
										onHide={() => setUpdateTestRecord(false)}
										date_tested={testRecordJson.date_tested}
										badge_text={badgeText}
									/>
									<Button variant="primary" size="sm" onClick={logOut}>
										Sign out
								</Button>
								</div>
							</Nav>
						</Col>
					</Row>
				</Navbar>
			</div >
		);
	}

}


export default AppNavbar;