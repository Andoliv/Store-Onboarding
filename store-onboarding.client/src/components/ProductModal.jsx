import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Icon, Input } from 'semantic-ui-react';

const ProductModal = (props) => {
  const [productForm, setValues] = useState({
      id: null,
      name: '',
      price: 0.0
  });

  useEffect(() => {
    if (props.product) {
      setValues({
        id: props.product.id,
        name: props.product.name,
        price: props.product.price
      });
    } else {
      setValues({ id: null, name: '', price: '' });
    }
  }, [props.product]);

  const onChange = (e) => {
    setValues({ ...productForm, [e.target.name]: e.target.value });
  }

  const fieldsValidation = () => {
    return !productForm.name || !productForm.price || productForm.name.length < 3 || productForm.price < 0.01;
  }

  let title = props.product ? 'Edit Product' : 'New Product';
  let onSubmit = props.product ? () => props.handleEdit(productForm) : () => props.handleSave(productForm);

  return (
    <Modal open={props.show} onClose={props.handleClose} size='tiny'>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <Input type="text" placeholder="Enter name" name='name' value={productForm.name} onChange={onChange} />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Input type="number" placeholder="99.99" name='price' value={productForm.price} onChange={onChange} />
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

export default ProductModal;