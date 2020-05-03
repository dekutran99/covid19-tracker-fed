import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class MarkerCard extends Component {
  render() {
    return (
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">Location Information</h5>
          <p class="card-text">Duration of stay</p>
          <Form>
            <Form.Group controlId="startTimeControl">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" placeholder="MM/DD/YYYY 00:00 AM" />
            </Form.Group>
            <Form.Group controlId="endTimeControl">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="datetime-local" placeholder="MM/DD/YYYY 00:00 AM" />
            </Form.Group>
          </Form>
          <Button variant="primary" size="sm" type="submit" active>
            Submit
          </Button>{" "}
          <Button variant="danger" size="sm" active>
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

export default MarkerCard;
