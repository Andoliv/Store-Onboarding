import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Icon } from 'semantic-ui-react';

const CustomerModal = (props) => {
  const [customerForm, setValues] = useState({
      id: null,
      name: '',
      address: '' 
  });

  useEffect(() => {
    if (props.customer) {
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

  const fieldsValidation = () => {
    return !customerForm.name || !customerForm.address || customerForm.name.length < 3 || customerForm.address.length < 3;
  }

  let title = props.customer ? 'Edit Customer' : 'New Customer';
  let onSubmit = props.customer ? () => props.handleEdit(customerForm) : () => props.handleSave(customerForm);

  return (
    <Modal open={props.show} onClose={props.handleClose} size='tiny'>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field required>
          <label>Name</label>
          <Input type="text" placeholder="Enter name" name='name' value={customerForm.name} onChange={onChange} />
        </Form.Field>
        <Form.Field required>
          <label>Address</label>
          <Input type="text" placeholder="Enter address" name='address' value={customerForm.address} onChange={onChange} />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
    <Button color='black' onClick={props.handleClose}>
          Close
        </Button>
        <Button positive icon onClick={onSubmit} labelPosition='right' disabled={fieldsValidation}>
          Save Changes
          <Icon name='checkmark' />
        </Button>
    </Modal.Actions>
  </Modal>
  );

};

export default CustomerModal;