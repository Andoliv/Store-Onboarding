import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

const CustomerModal = (props) => {
  const [customerForm, setValues] = useState({
      id: null,
      name: '',
      address: '' 
  });

  useEffect(() => {
    if (props.customer) {
      const { id, name, address } = props.customer;
      setValues({
        id: props.customer.id,
        name: props.customer.name,
        address: props.customer.address
      });
    } else {
      setValues({ id: null, name: '', address: '' });
    }
  }, [props.customer]);

  const onChange = (e) => {
    setValues({ ...customerForm, [e.target.name]: e.target.value });
  }

  let title = props.customer ? 'Edit Customer' : 'New Customer';
  let onSubmit = props.customer ? () => props.handleEdit(customerForm) : () => props.handleSave(customerForm);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCustomerName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name='name' value={customerForm.name} onChange={onChange} />
          </Form.Group>
          <Form.Group controlId="formCustomerAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" name='address' value={customerForm.address} onChange={onChange} />
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

export default CustomerModal;