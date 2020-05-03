import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SubmitLoginForm() {
  // Getting login authorization from api.codegram.dev
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  let raw =
    '{\n	"username": "' +
    this.state.username +
    '",\n	"password": "' +
    this.state.password +
    '"\n}';

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  // indicate where there is error in request
  let error;

  fetch("https://covid-19-tracker-276100.wl.r.appspot.com/auth/login", requestOptions)
    .then((response) => {
      if (!response.ok) {
        error = true;
      } else {
        error = false;
      }
      return response.json();
    })
    .then((data) => {
      if (error === true) {
        let errorMsg = "";
        for (let err in data) {
          errorMsg += err + ": " + data[err] + "\n";
        }
      //   dispatch({
      //     type: LOGIN_FAIL,
      //     msg: errorMsg,
      //   });
      // } else if (error === false) {
      //   dispatch({
      //     type: LOGIN_SUCCESS,
      //     payload: data,
      //   });
      // }
    }})
    .catch((error) => console.log("error", error));
}

function handleChange(event) {
  this.setState({
    [event.target.id]: event.target.value,
  });
}

function MyLoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={SubmitLoginForm}>
          <Form.Group controlId="loginUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={this.state.userName}
              placeholder="Enter user name"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={this.state.password}
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
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Login
      </Button>

      <MyLoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    };
  }

  render() {
    return <App />;
  }
}

export default LoginModal;
