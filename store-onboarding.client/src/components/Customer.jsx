import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Icon } from 'semantic-ui-react';
import CustomerModal from './CustomerModal';
import DeleteModal from './DeleteModal';
import Home from './Home';

function Customer () {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        const response = await axios.get('http://localhost:5097/api/customers');
        setCustomers(response.data);
    }

    const onAddCustomer = () => {
      setSelectedCustomer(null);
      setShowModal(true);
    }

    const onUpdateCustomer = (id) => {
      const customer = customers.find(c => c.id === id);
      setSelectedCustomer(customer);
      setShowModal(true);
    }

    const onDeleteCustomer = (id) => {
      const customer = customers.find(c => c.id === id);
      setSelectedCustomer(customer);
      setShowDeleteModal(true);
    }

    const handleSave = async (customer) => {
      const response = await axios.post('http://localhost:5097/api/customers', customer);
      fetchCustomer();
      setShowModal(false);  
    };

    const handleEdit = async (customer) => {
      const response = await axios.put(`http://localhost:5097/api/customers/${customer.id}`, customer);
      fetchCustomer();
      setShowModal(false);
    }

    const handleDelete = async (id) => {
      const response = await axios.delete(`http://localhost:5097/api/customers/${id}`);
      fetchCustomer();
      setShowDeleteModal(false);
    }

    let tableData = null;

    if (customers.length > 0) {
        tableData = customers.map(customer => 
          <Table.Row key={customer.id}>
            <Table.Cell>{customer.name}</Table.Cell>
            <Table.Cell>{customer.address}</Table.Cell>
            <Table.Cell>
                <Button color='yellow' onClick={() => onUpdateCustomer(customer.id)}>
                  <Icon name='edit outline' />
                  Edit
                </Button>
                
            </Table.Cell>
            <Table.Cell>
                <Button color='red' onClick={() => onDeleteCustomer(customer.id)}>
                  <Icon name='trash alternate outline' />
                  Delete
                </Button>
            </Table.Cell>
          </Table.Row>
        )
    }

    return (
      <>
        <Home />
        <div style={{textAlign: 'left', padding: '10px 0'}}>
          <Button color='blue' onClick={onAddCustomer}>New Customer</Button>
        </div>
        <CustomerModal show={showModal} 
                      handleClose={() => setShowModal(false)} 
                      handleSave={handleSave} 
                      handleEdit={handleEdit} 
                      handleDelete={handleDelete}
                      customer={selectedCustomer}
        />
        <DeleteModal show={showDeleteModal} 
                      handleClose={() => setShowDeleteModal(false)} 
                      handleDelete={handleDelete} 
                      selectedResource={selectedCustomer}
                      resourceName='customer'
        />
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData}
            </Table.Body>
        </Table>
      </>
    );
}

export default Customer;