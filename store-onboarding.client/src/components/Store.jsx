import {React, useState, useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
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
            <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                    <Button variant="warning" onClick={() => onUpdateStore(store.id)}>Edit</Button> {' '}
                </td>
                <td>
                    <Button variant="danger" onClick={() => onDeleteStore(store.id)}>Delete</Button> {' '}
                </td>
            </tr>
        ));
    }

    return (
        <>
        <Home />
            <div style={{textAlign: 'left', padding: '10px 0'}}>
                <Button variant="primary" onClick={() => onAddStore()}>Add Store</Button>
            </div>
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