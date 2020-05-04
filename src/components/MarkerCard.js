import React from "react";

import {
    Button,
    Form,
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function MarkerCard(props) {

    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Content-Type", "text/plain");
        myHeaders.append("Cookie", "auth_token=5c6499a57496e3ce46291f991bd58c62b2f2a0a18821896b6d48dbaeff3a896e");

        var raw = "{\n    \"latitude\": \"69.23489236336972000\",\n    \"longitude\": \"-69.08944702148439000\",\n    \"log_start\": \"2020-05-03T09:37:41Z\",\n    \"log_end\": \"2020-05-03T10:00:00Z\"\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: 'include',
        };

        fetch("http://127.0.0.1:8000/logs/log/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    function handleDelete(e) {
        console.log('yeehawww')
    }

    return (
        <div className="card" style={{ width: "16rem" }}>
            <div className="card-body">
                <h5 className="card-title">Location Information</h5>
                <Form>
                    <Form.Group controlId="startTimeControl">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="MM/DD/YYYY 00:00 AM"
                            onChange={e => setStartTime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="endTimeControl">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="MM/DD/YYYY 00:00 AM"
                            onChange={e => setEndTime(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" size="sm" active onClick={handleSubmit}>
                    Submit
                    </Button>
                {" "}
                <Button variant="danger" size="sm" active onClick={handleDelete}>
                    Delete
                    </Button>
            </div>
        </div>
    );
}

export default MarkerCard;