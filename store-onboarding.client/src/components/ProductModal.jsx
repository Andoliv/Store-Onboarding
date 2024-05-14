import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

const ProductModal = (props) => {
  const [productForm, setValues] = useState({
      id: null,
      name: '',
      price: 0.0
  });

  useEffect(() => {
    if (props.product) {
      const { id, name, price } = props.product;
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

  let title = props.product ? 'Edit Product' : 'New Product';
  let onSubmit = props.product ? () => props.handleEdit(productForm) : () => props.handleSave(productForm);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name='name' value={productForm.name} onChange={onChange} />
          </Form.Group>
          <Form.Group controlId="formProductAddress">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="99.99" name='price' value={productForm.price} onChange={onChange} />
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

export default ProductModal;