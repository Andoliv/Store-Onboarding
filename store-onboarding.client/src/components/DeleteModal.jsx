import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';


const DeleteModal = (props) => {
    const id = props.selectedResource ? props.selectedResource.id : null;
    let title = props.resourceName ? ` ${props.resourceName}` : '';

    return (
        <Modal open={props.show} onClose={props.handleClose} size='tiny'>
            <Modal.Header>Delete{title}</Modal.Header>
            <Modal.Content>
                Are you sure you want to delete?
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={props.handleClose}>
                Cancel
                </Button>
                <Button negative icon onClick={() => props.handleDelete(id)} labelPosition='right'>
                Delete
                <Icon name='close' />
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteModal;