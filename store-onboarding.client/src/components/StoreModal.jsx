import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react';

const StoreModal = (props) => {
  const [storeForm, setValues] = useState({
      id: null,
      name: '',
      address: '' 
  });

  useEffect(() => {
    if (props.store) {
      const { id, name, address } = props.store;
      setValues({ id, name, address });
    } else {
      setValues({ id: null, name: '', address: '' });
    }
  }, [props.store]);

  const onChange = (e) => {
    setValues({ ...storeForm, [e.target.name]: e.target.value });
  }

  const fieldsValidation = !storeForm.name || !storeForm.address || storeForm.name.length < 3 || storeForm.address.length < 3;

  let title = props.store ? 'Edit Store' : 'New Store';
  let onSubmit = props.store ? () => props.handleEdit(storeForm) : () => props.handleSave(storeForm);

  return (
    <Modal open={props.show} onClose={props.handleClose} size='tiny'>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <Input type="text" placeholder="Enter name" name='name' value={storeForm.name} onChange={onChange} />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input type="text" placeholder="Enter address" name='address' value={storeForm.address} onChange={onChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={props.handleClose}>
          Close
        </Button>
        <Button positive icon onClick={onSubmit} labelPosition='right' disabled={fieldsValidation}>
          Save Changes
          <Icon name='check' />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default StoreModal;