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
        try {
            const response = await axios.get('https://store-onboarding.azurewebsites.net/api/sales');            
            setSales(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const onAddSale = () => {
        setSelectedSale(null);
        setShowModal(true);
    }        

    const onUpdateSale = (id) => {
        if (!id) {
            console.error('ID is not provided');
            return;
        }

        const sale = sales.find(s => s.id === id);

        if (!sale) {
            console.error('Sale not found');
            return;
        }

        setSelectedSale(sale);
        setShowModal(true);
    }

    const onDeleteSale = (id) => {
        if (!id) {
            console.error('ID is not provided');
            return;
        }

        const sale = sales.find(s => s.id === id);

        if (!sale) {
            console.error('Sale not found');
            return;
        }

        setSelectedSale(sale);
        setShowDeleteModal(true);
    }

    const handleSave = async (sale) => {
        if (!sale) {
            console.error('Invalid sale');
            return;
        }

        if (!sale.product.id || !sale.customer.id || !sale.store.id) {
            console.error('Product ID, Customer ID, and Store ID are required');
            return;
        }

        let saleModelApi = {
            productId: sale.product.id,
            customerId: sale.customer.id,
            storeId: sale.store.id,
            dateSold: new Date(sale.dateSold).toISOString()
        };

        try {
            const response = await axios.post('https://store-onboarding.azurewebsites.net/api/sales', saleModelApi);
            if (!response.data) {
                console.error('No data in response');
                return;
            }
            
            getSales();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (sale) => {
        if (!sale) {
            console.error('Invalid sale');
            return;
        }

        if (!sale.product.id || !sale.customer.id || !sale.store.id) {
            console.error('Product ID, Customer ID, and Store ID are required');
            return;
        }

        let saleModelApi = {
            id: sale.id,
            productId: sale.product.id,
            customerId: sale.customer.id,
            storeId: sale.store.id,
            dateSold: new Date(sale.dateSold).toISOString()
        };

        try {
            const response = await axios.put(`https://store-onboarding.azurewebsites.net/api/sales/${sale.id}`, saleModelApi);
            if (!response.data) {
                console.error('No data in response');
                return;
            }

            getSales();
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
            const response = await axios.delete(`https://store-onboarding.azurewebsites.net/api/sales/${id}`);
            if (response.status !== 204) {
                console.error('Unexpected status code: ' + response.status);
                return;
            }

            getSales();
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (datetime) => {
        if (!datetime) {
            return new Date().toLocaleDateString('en-GB');
        }

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(datetime).toLocaleDateString('en-GB',options);
    }

    const renderTableData = () => {
        if (sales.length > 0) {
            let tableData = sales.map((sale) =>
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

            return tableData;
        } else {
            return (
                <Table.Row>
                    <Table.Cell colSpan='6'>No data found</Table.Cell>
                </Table.Row>
            );
        }
    }

    return (
        <>
            <Home />
            <div style={{textAlign: 'left', padding: '10px 0'}}>
                <Button color='blue' onClick={() => onAddSale()}>Add Sale</Button>
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
                    {renderTableData()}
                </Table.Body>
            </Table>
            {showModal && <SalesModal show={showModal}
                    sale={selectedSale}
                    handleClose={() => setShowModal(false)}                 
                    handleSave={handleSave} 
                    handleEdit={handleEdit} 
                />
            }
            {showDeleteModal && <DeleteModal show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}                 
                    handleDelete={handleDelete} 
                    selectedResource={selectedSale} 
                    resourceName='sale'
                />
            }
        </>
    );
}

export default Sales;