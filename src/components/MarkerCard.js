import React from "react";

import {
    Button,
    Form,
} from 'react-bootstrap';

function MarkerCard(props) {

    const [startTime, setStartTime] = React.useState(props.log.log_start);
    const [endTime, setEndTime] = React.useState(props.log.log_end);

    async function handleSubmit(e) {
        e.preventDefault();

        // let url = "http://127.0.0.1:8000/"
        let url = "https://apic19gt.tranquanghuy.me/"
        let path = "logs/log/"

        let myHeaders = new Headers();

        let raw = {
            id: props.log.id,
            latitude: props.log.latitude,
            longitude: props.log.longitude,
            log_start: startTime,
            log_end: endTime
        };

        let body = JSON.stringify(raw);

        if (raw.id == null) {
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
        } else {
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: body,
                redirect: 'follow',
                credentials: 'include'
            }

            await fetch(url + path, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        window.location.reload();

    }

    async function handleDelete(e) {
        e.preventDefault();

        // let url = "http://127.0.0.1:8000/"
        let url = "https://apic19gt.tranquanghuy.me/"
        let path = "logs/log/"

        let myHeaders = new Headers();

        let raw = {
            id: props.log.id,
            latitude: props.log.latitude,
            longitude: props.log.longitude,
            log_start: startTime,
            log_end: endTime
        };

        let body = JSON.stringify(raw);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: body,
            redirect: 'follow',
            credentials: 'include'
        }

        await fetch(url + path, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload();

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
                <div>
                    <Button variant="primary" size="sm" active onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
                <div>
                    <Button variant="danger" size="sm" active onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MarkerCard;