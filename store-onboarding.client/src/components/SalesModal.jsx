import React, { act, useEffect, useState } from 'react';
import { Button, Modal, Form, Dropdown, Icon } from 'semantic-ui-react';
import axios from 'axios';

const SalesModal = (props) => {
  const [salesForm, setValues] = useState({
      id: null,
      product: { id: null, name: '' },
      customer: { id: null, name: '' },
      store: { id: null, name: '' },
      dateSold: new Date().toLocaleDateString('en-CA')
  });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (props.sale) {
      const { id, product, customer, store, dateSold } = props.sale;
      setValues({
        id: props.sale.id,
        product: props.sale.product,
        customer: props.sale.customer,
        store: props.sale.store,
        dateSold: props.sale.dateSold
      });
    } else {
      setValues({ id: null, 
          product: { id: null, name: '' }, 
          customer: { id: null, name: '' }, 
          store: { id: null, name: '' }, 
          dateSold: new Date().toLocaleDateString('en-CA') 
      });
    }

    getCustomers();
    getProducts();
    getStores();
  }, [props.sale]);


  let title = props.sale ? 'Edit Sale' : 'New Sale';
  let onSubmit = props.sale ? () => props.handleEdit(salesForm) : () => props.handleSave(salesForm);

  const dateForPicker = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  const getCustomers = async () => {
    const response = await axios.get('http://localhost:5097/api/customers');
    setCustomers(response.data);
  }

  const getProducts = async () => {
      const response = await axios.get('http://localhost:5097/api/products');
      setProducts(response.data);
  }

  const getStores = async () => {
      const response = await axios.get('http://localhost:5097/api/stores');
      setStores(response.data);
  }

  const customerOptions = customers.map((customer) => {
    if (customer.id === salesForm.customer.id){
      return { key: customer.id, value: customer.id, text: customer.name, selected: true, active: true };
    }

    return { key: customer.id, value: customer.id, text: customer.name,  };
  });
  const productOptions = products.map((product) => {
    if (product.id === salesForm.product.id){
      return { key: product.id, value: product.id, text: product.name, selected: true, active: true };
    }

    return { key: product.id, value: product.id, text: product.name };
  });
  const storeOptions = stores.map((store) => {
    if (store.id === salesForm.store.id){
      return { key: store.id, value: store.id, text: store.name, selected: true, active: true };
    }

    return { key: store.id, value: store.id, text: store.name };
  });

  const onDateChange = (e) => {
    setValues({...salesForm, dateSold: e.target.value});
  }

  const onCustomerChange = (e, data) => {
    setValues({...salesForm, customer: {
      id: data.value,
      name: data.options.find(o => o.value === data.value).text
    }});
  };

  const onProductChange = (e, data) => {
    setValues({...salesForm, product: {
      id: data.value,
      name: data.options.find(o => o.value === data.value).text
    }});
  };

  const onStoreChange = (e, data) => {
    setValues({...salesForm, store: {
      id: data.value,
      name: data.options.find(o => o.value === data.value).text
    }});
  };

  return (
    <>
    <Modal open={props.show} onClose={props.handleClose} size='tiny'>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Date Sold</label>
            <input type="date" value={dateForPicker(salesForm.dateSold)} onChange={onDateChange} />
          </Form.Field>
          <Form.Field>
            <label>Customer</label>
            <Dropdown placeholder='Select Customer' fluid selection value={salesForm.customer.id} options={customerOptions} onChange={onCustomerChange} />
          </Form.Field>
          <Form.Field>
            <label>Product</label>
            <Dropdown placeholder='Select Product' fluid selection value={salesForm.product.id} options={productOptions} onChange={onProductChange} />
          </Form.Field>
          <Form.Field>
            <label>Store</label>
            <Dropdown placeholder='Select Store' fluid selection value={salesForm.store.id} options={storeOptions} onChange={onStoreChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={props.handleClose}>
          Close
        </Button>
        <Button positive icon onClick={onSubmit} labelPosition='right' disabled={fieldsValidation()}>
          Save Changes
          <Icon name='checkmark' />
        </Button>        
      </Modal.Actions>
    </Modal>
    </>
  );

  function fieldsValidation() {
    return !salesForm.customer.id || !salesForm.product.id || !salesForm.store.id || !salesForm.dateSold;
  }
}

export default SalesModal;
