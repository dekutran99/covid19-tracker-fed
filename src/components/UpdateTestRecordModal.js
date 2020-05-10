import React from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function UpdateTestRecordModal(props) {

    const [dateTested, setDateTested] = React.useState('');

    React.useEffect(() => {
        setDateTested(props.date_tested);
    }, [props.date_tested])

    async function updateTestStatus(e) {

        // let url = "http://127.0.0.1:8000/";
        let url = "https://apic19gt.tranquanghuy.me/";
        let path = 'logs/teststatus/';

        let myHeaders = new Headers();

        let positive;
        let test_result = document.getElementById('test-result').value;
        if (test_result === 'I was tested negative.') {
            positive = 'False';
        } else if (test_result === 'I was tested positive.') {
            positive = 'True';
        }

        let raw = {
            date_tested: dateTested,
            positive: positive
        }

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow',
            credentials: 'include'
        };

        await fetch(url + path, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload();
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
                    <strong>Update Test Status</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className=''>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            If you have recently got tested for COVID-19, what is your test result?
                        </Form.Label>
                        <Form.Control
                            placeholder='Let us know'
                            as='select'
                            id='test-result'
                        >
                            <option></option>
                            <option>I was tested negative.</option>
                            <option>I was tested positive.</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="date-tested">
                        <Form.Label>Date tested</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateTested}
                            onChange={e => setDateTested(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant='primary' size='sm' onClick={updateTestStatus}>
                    Submit
                </Button>
            </Modal.Body>
        </Modal>
    )
}
