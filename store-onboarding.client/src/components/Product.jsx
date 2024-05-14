import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Home from './Home';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            products: [],
            tableData: null,
            selectedProduct: null,
            showDeleteModal: false
        }
    }

    getProducts = async () => {
        await axios.get('http://localhost:5097/api/products')
        .then(response => response.data)
        .then(data => this.setState({ products: data }, () => this.loadTableData()))
        // .then(data => this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         products: data
        //     }
        // }))
        .catch(error => console.log(error));
    }

    loadTableData = async () => {
        let tableData = null;
        let products = this.state.products;

        if (products.length > 0) {
            tableData = products.map(product => 
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button variant="warning" onClick={() => this.onUpdateProduct(product.id)}>Edit</Button>{' '}
                    </td>
                    <td>
                        <Button variant="danger" onClick={() => this.onDeleteProduct(product.id)}>Delete</Button>{' '}
                    </td>
                </tr>
            )
        }

        this.setState({ tableData: tableData}, () => this.forceUpdateState());
    }

    forceUpdateState() {
        console.log('forceUpdateState');
    }

    componentDidMount() {
        this.getProducts();
    }

    onAddProduct = async () => {
        this.setState({ selectedProduct: null, showModal: true}, () => this.forceUpdateState());
    }

    onUpdateProduct = (id) => {
        const product = this.state.products.find(c => c.id === id);
        this.setState({ selectedProduct: product, showModal: true}, () => this.forceUpdateState());
    }

    onDeleteProduct = (id) => {
        const product = this.state.products.find(c => c.id === id);
        this.setState({ selectedProduct: product, showDeleteModal: true}, () => this.forceUpdateState());
    }

    handleSave = async (product) => {
        const response = await axios.post('http://localhost:5097/api/products', product);
        this.getProducts();
        this.setState({ showModal: false }, () => this.forceUpdateState());
    }

    handleEdit = async (product) => {
        const response = await axios.put(`http://localhost:5097/api/products/${product.id}`, product);
        this.getProducts();
        this.setState({ showModal: false }, () => this.forceUpdateState());
    }

    handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5097/api/products/${id}`);
        this.getProducts();
        this.setState({ showDeleteModal: false }, () => this.forceUpdateState());
    }

    render() {

        return (
            <>
                <Home />
                <div style={{textAlign: 'left', padding: '10px 0'}}>
                    <Button variant="primary" onClick={() => this.onAddProduct()}>New Product</Button>{' '}
                </div>
                <ProductModal show={this.state.showModal} 
                    handleClose={() => this.setState({ showModal: false }, () => this.forceUpdateState())} 
                    handleSave={this.handleSave} 
                    handleEdit={this.handleEdit} 
                    handleDelete={this.handleDelete}
                    product={this.state.selectedProduct}
                />
                <DeleteModal show={this.state.showDeleteModal} 
                    handleClose={() => this.setState({ showDeleteModal: false }, () => this.forceUpdateState())}
                    handleDelete={this.handleDelete} 
                    selectedResource={this.state.selectedProduct}
                    resourceName='product'
                />
                <Table striped bordered hover>
                    <thead> 
                        <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default Product;