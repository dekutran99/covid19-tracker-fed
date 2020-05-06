import React from "react";

import {
    Button,
    Form,
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function MarkerCard(props) {

    const [startTime, setStartTime] = React.useState(props.log.log_start);
    const [endTime, setEndTime] = React.useState(props.log.log_end);

    async function handleSubmit(e) {
        e.preventDefault();

        // let url = "http://127.0.0.1:8000/"
        let url = "https://covid-19-tracker-276100.wl.r.appspot.com/"
        let path = "logs/log/"

        let myHeaders = new Headers();

        let raw = {
            latitude: props.log.latitude,
            longitude: props.log.longitude,
            log_start: startTime,
            log_end: endTime
        };

        let body = JSON.stringify(raw);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow',
            credentials: 'include',
        };

        await fetch(url + path, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload();

    }

    function handleDelete(e) {
        console.log('yeehawww');
    }

    return (
        <div className="card" style={{ width: "260px" }}>
            <div className="card-body">
                <h5 className="card-title">Location Information</h5>
                <Form>
                    <Form.Group controlId="startTimeControl">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startTime}
                            // placeholder="MM/DD/YYYY 00:00:00 AM"
                            onChange={e => setStartTime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="endTimeControl">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={endTime}
                            // placeholder="MM/DD/YYYY 00:00 AM"
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