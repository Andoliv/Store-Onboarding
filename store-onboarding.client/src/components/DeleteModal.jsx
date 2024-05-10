import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';


const DeleteModal = (props) => {
    const id = props.customer ? props.customer.id : null;
    let title = props.resource ? ` ${props.resource}` : '';

    return (
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Delete{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={props.handleClose}>
            Close
            </Button>
            <Button variant="danger" onClick={() => props.handleDelete(id)}>
            Delete
            <Icon name='trash' />
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;