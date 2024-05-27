import { React, useState, useEffect } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import StoreModal from './StoreModal';
import DeleteModal from './DeleteModal';
import Home from './Home';

function Store() {
    const [stores, setStores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        fetchStore();       
    }, []);

    const fetchStore = async () => {
        try {
            const response = await axios.get('https://store-onboarding.azurewebsites.net/api/stores');
            setStores(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const onAddStore = () => {
      setSelectedStore(null);
      setShowModal(true);
    }

    const onUpdateStore = (id) => {
        if (!id) {
            console.error('ID is not provided');
            return;
        }

        const store = stores.find(s => s.id === id);

        if (!store) {
            console.error('Store not found');
            return;
        }

        setSelectedStore(store);
        setShowModal(true);
    }

    const onDeleteStore = (id) => {
        if (!id) {
            console.error('ID is not provided');
            return;
        }

        const store = stores.find(s => s.id === id);

        if (!store) {
            console.error('Store not found');
            return;
        }

        setSelectedStore(store);
        setShowDeleteModal(true);
    }

    const handleSave = async (store) => {
        if (!store) {
            console.error('Invalid store');
            return;
        }

        try {
            const response = await axios.post('https://store-onboarding.azurewebsites.net/api/stores', store);
            if (!response.data) {
                console.error('No data in response');
                return;
            }
            
            fetchStore();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }    
    }

    const handleEdit = async (store) => {
        if (!store) {
            console.error('Invalid store');
            return;
        }

        try {
            const response = await axios.put(`https://store-onboarding.azurewebsites.net/api/stores/${store.id}`, store);
            if (!response.data) {
                console.error('No data in response');
                return;
            }

            fetchStore();
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
            const response = await axios.delete(`https://store-onboarding.azurewebsites.net/api/stores/${id}`);
            if (response.status !== 204) {
                console.error('Unexpected status code: ' + response.status);
                return;
            }

            fetchStore();
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error);
        }
    }

    const renderTableData = () => {
        if (stores.length > 0) {
            let tableData = stores.map(store => (
                <Table.Row key={store.id}>
                    <Table.Cell>{store.name}</Table.Cell>
                    <Table.Cell>{store.address}</Table.Cell>
                    <Table.Cell>
                        <Button color='yellow' onClick={() => onUpdateStore(store.id)}>
                            <Icon name='edit outline' />
                            Edit
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' onClick={() => onDeleteStore(store.id)}>
                            <Icon name='trash alternate outline' />
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
            ));

            return tableData;
        } else {
            return (
                <Table.Row>
                    <Table.Cell colSpan='4'>No data found</Table.Cell>
                </Table.Row>
            );
        }
    }

    return (
        <>
            <Home />
            <div style={{textAlign: 'left', padding: '10px 0'}}>
                <Button color='blue' onClick={() => onAddStore()}>Add Store</Button>
            </div>
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
                    {renderTableData()}
                </Table.Body>
            </Table>
            {showModal && <StoreModal show={showModal} 
                    store={selectedStore} 
                    handleSave={handleSave} 
                    handleEdit={handleEdit} 
                    handleClose={() => setShowModal(false)} 
                />
            }
            {showDeleteModal && <DeleteModal show={showDeleteModal} 
                    handleClose={() => setShowDeleteModal(false)} 
                    handleDelete={handleDelete} 
                    selectedResource={selectedStore}
                    resourceName='store'
                />
            }
        </>
    );
}

export default Store;