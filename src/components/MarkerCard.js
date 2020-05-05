import React from "react";

import {
    Button,
    Form,
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function MarkerCard(props) {

    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Content-Type", "text/plain");
        
        let raw = {
            "latitude": props.position.lat,
            "longitude": props.position.lng,
            "log_start": startTime,
            "log_end": endTime
        };

        let body = JSON.stringify(raw);

        let requestOptions = {
            method: 'POST',
            mode: 'no-cors',
            headers: myHeaders,
            body: body,
            redirect: 'follow',
            credentials: 'include',
        };

        await fetch("https://covid-19-tracker-276100.wl.r.appspot.com/logs/log/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        window.location.reload();

    }

    function handleDelete(e) {
        console.log('yeehawww');
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