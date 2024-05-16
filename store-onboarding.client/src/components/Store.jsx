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

    useEffect(() => {
        fetchStore();
    }, []);

    const fetchStore = async () => {
        const response = await axios.get('http://localhost:5097/api/stores');
        setStores(response.data);
    }

    const onAddStore = () => {
      setSelectedStore(null);
      setShowModal(true);
    }

    const onUpdateStore = (id) => {
      const store = stores.find(s => s.id === id);
      setSelectedStore(store);
      setShowModal(true);
    }

    const onDeleteStore = (id) => {
      const store = stores.find(s => s.id === id);
      setSelectedStore(store);
      setShowDeleteModal(true);
    }

    const handleSave = async (store) => {
      const response = await axios.post('http://localhost:5097/api/stores', store);
      fetchStore();
      setShowModal(false);      
    }

    const handleEdit = async (store) => {
      const response = await axios.put(`http://localhost:5097/api/stores/${store.id}`, store);
      fetchStore();
      setShowModal(false);
    }

    const handleDelete = async (id) => {
      const response = await axios.delete(`http://localhost:5097/api/stores/${id}`);
      fetchStore();
      setShowDeleteModal(false);
    }

    let tableData = null;

    if (stores.length > 0) {
        tableData = stores.map(store => (
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
                    {tableData}
                </Table.Body>
            </Table>
            <StoreModal show={showModal} 
                store={selectedStore} 
                handleSave={handleSave} 
                handleEdit={handleEdit} 
                handleClose={() => setShowModal(false)} 
            />
            <DeleteModal show={showDeleteModal} 
                handleClose={() => setShowDeleteModal(false)} 
                handleDelete={handleDelete} 
                selectedResource={selectedStore}
                resourceName='store'
            />
        </>
    );
}

export default Store;