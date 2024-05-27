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
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
      fetchCustomer();
    }, [customers]);

    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:5097/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        renderTableData();
      }
    }

    const onAddCustomer = () => {
      setSelectedCustomer(null);
      setShowModal(true);
    }

    const onUpdateCustomer = (id) => {
      if (!id) {
        console.error('ID is not provided');
        return;
      }

      const customer = customers.find(c => c.id === id);

      if (!customer) {
        console.error('Customer not found');
        return;
      }

      setSelectedCustomer(customer);
      setShowModal(true);
    }

    const onDeleteCustomer = (id) => {
      if (!id) {
        console.error('ID is not provided');
        return;
      }

      const customer = customers.find(c => c.id === id);

      if (!customer) {
        console.error('Customer not found');
        return;
      }

      setSelectedCustomer(customer);
      setShowDeleteModal(true);
    }

    const handleSave = async (customer) => {
      if (!customer) {
        console.error('Invalid customer');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5097/api/customers', customer);
        if (!response.data) {
          console.error('No data in response');
          return;
        }
        
        fetchCustomer();
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
        
    };

    const handleEdit = async (customer) => {
      if (!customer) {
        console.error('Invalid customer');
        return;
      }

      try {
        const response = await axios.put(`http://localhost:5097/api/customers/${customer.id}`, customer);
        if (!response.data) {
          console.error('No data in response');
          return;
        }

        fetchCustomer();
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }

    const handleDelete = async (id) => {
      if (!id) {
        console.error('ID is not provided');
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:5097/api/customers/${id}`);
        if (response.status !== 204) {
          console.error('Unexpected status code: ' + response.status);
          return;
        }

        fetchCustomer();
        setShowDeleteModal(false);
      } catch (error) {
        console.error(error);
      }
    }

    const renderTableData = () => {
      console.log('renderTableData: Customers');
      if (customers.length > 0) {
        let tableData = customers.map(customer => 
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
          );    
        
        setTableData(tableData);

        return tableData;
      }      
    }
    

    return (
      <>
        <Home />
        <div style={{textAlign: 'left', padding: '10px 0'}}>
          <Button color='blue' onClick={() => onAddCustomer()}>New Customer</Button>
        </div>
        {showModal && <CustomerModal show={showModal}
            handleClose={() => setShowModal(false)} 
            handleSave={handleSave} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete}
            customer={selectedCustomer}
          />
        }
        {showDeleteModal && <DeleteModal show={showDeleteModal} 
            handleClose={() => setShowDeleteModal(false)} 
            handleDelete={handleDelete} 
            selectedResource={selectedCustomer}
            resourceName='customer'
          />
        }
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