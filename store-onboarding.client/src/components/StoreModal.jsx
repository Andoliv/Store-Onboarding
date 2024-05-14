import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

const StoreModal = (props) => {
  const [storeForm, setValues] = useState({
      id: null,
      name: '',
      address: '' 
  });

  useEffect(() => {
    if (props.store) {
      const { id, name, address } = props.store;
      setValues({
        id: props.store.id,
        name: props.store.name,
        address: props.store.address
      });
    } else {
      setValues({ id: null, name: '', address: '' });
    }
  }, [props.store]);

  const onChange = (e) => {
    setValues({ ...storeForm, [e.target.name]: e.target.value });
  }

  let title = props.store ? 'Edit Store' : 'New Store';
  let onSubmit = props.store ? () => props.handleEdit(storeForm) : () => props.handleSave(storeForm);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formStoreName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name='name' value={storeForm.name} onChange={onChange} />
          </Form.Group>
          <Form.Group controlId="formStoreAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" name='address' value={storeForm.address} onChange={onChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={onSubmit}>        
          Save Changes
          <Icon name='check' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreModal;