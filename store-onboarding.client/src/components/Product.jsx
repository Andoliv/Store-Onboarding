import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
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
                <Table.Row key={product.id}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>${product.price}</Table.Cell>
                    <Table.Cell>
                        <Button color='yellow' onClick={() => this.onUpdateProduct(product.id)}>
                            <Icon name='edit outline' />
                            Edit
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' onClick={() => this.onDeleteProduct(product.id)}>
                            <Icon name='trash alternate outline' />
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
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
                    <Button color='blue' onClick={() => this.onAddProduct()}>New Product</Button>
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
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.tableData}
                    </Table.Body>
                </Table>
            </>
        );
    }
}

export default Product;