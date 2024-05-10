import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import DeleteModal from './DeleteModal';

export default function Customer () {
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
    }

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
            <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>
                    <Button variant="warning" onClick={() => onUpdateCustomer(customer.id)}>Edit</Button>{' '}
                </td>
                <td>
                    <Button variant="danger" onClick={() => onDeleteCustomer(customer.id)}>Delete</Button>{' '}
                </td>
            </tr>
        )
    }

    return (
      <>
        <div style={{textAlign: 'left', padding: '10px 0'}}>
          <Button variant="primary" onClick={() => onAddCustomer()}>New Customer</Button>{' '}
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
                      customer={selectedCustomer}
                      resource='customer'
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </Table>
      </>
    );
}
