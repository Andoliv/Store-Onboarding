import { React, useState, useEffect } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Home from './Home';
import SalesModal from './SalesModal';
import DeleteModal from './DeleteModal';

function Sales() {
    const [sales, setSales] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);


    useEffect(() => {
        getSales();
    }, []);

    const getSales = async () => {
        const response = await axios.get('http://localhost:5097/api/sales');
        setSales(response.data);
    }

    const onAddSale = () => {
        setSelectedSale(null);
        setShowModal(true);
    }

    const onUpdateSale = (id) => {
        const sale = sales.find(s => s.id === id);
        setSelectedSale(sale);
        setShowModal(true);
    }

    const onDeleteSale = (id) => {
        const sale = sales.find(s => s.id === id);
        setSelectedSale(sale);
        setShowDeleteModal(true);
    }

    const handleSave = async (sale) => {
        let saleModelApi = {
            productId: sale.product.id,
            customerId: sale.customer.id,
            storeId: sale.store.id,
            dateSold: new Date(sale.dateSold).toISOString()
        };

        const response = await axios.post('http://localhost:5097/api/sales', saleModelApi);
        getSales();
        setShowModal(false);
    }

    const handleEdit = async (sale) => {
        let saleModelApi = {
            id: sale.id,
            productId: sale.product.id,
            customerId: sale.customer.id,
            storeId: sale.store.id,
            dateSold: new Date(sale.dateSold).toISOString()
        };

        const response = await axios.put(`http://localhost:5097/api/sales/${sale.id}`, saleModelApi);
        getSales();
        setShowModal(false);
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5097/api/sales/${id}`);
        getSales();
        setShowDeleteModal(false);
    }

    const formatDate = (datetime) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(datetime).toLocaleDateString('en-GB',options);
    }

    let tableData = null;

    if (sales.length > 0) {
        tableData = sales.map((sale) => {
            return (
                <Table.Row key={sale.id}>
                    <Table.Cell>{sale.customer.name}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>{sale.store.name}</Table.Cell>
                    <Table.Cell>{formatDate(sale.dateSold)}</Table.Cell>
                    <Table.Cell>                        
                        <Button color='yellow' onClick={() => onUpdateSale(sale.id)}>
                            <Icon name='edit outline' />
                            Edit
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' onClick={() => onDeleteSale(sale.id)}>
                            <Icon name='trash alternate outline' />
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    return (
        <>
            <Home />
            <div style={{textAlign: 'left', padding: '10px 0'}}>
                <Button color='blue' onClick={onAddSale}>Add Sale</Button>
            </div>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableData}
                </Table.Body>
            </Table>
            <SalesModal show={showModal} 
                sale={selectedSale}
                handleClose={() => setShowModal(false)}                 
                handleSave={handleSave} 
                handleEdit={handleEdit} 
            />
            <DeleteModal show={showDeleteModal} 
                handleClose={() => setShowDeleteModal(false)}                 
                handleDelete={handleDelete} 
                selectedResource={selectedSale} 
                resourceName='sale'
            />
        </>
    );

}

export default Sales;