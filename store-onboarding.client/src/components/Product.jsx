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
            showDeleteModal: false,
            forceUpdate: false
        }
    }

    getProducts = async () => {
        await axios.get('https://store-onboarding.azurewebsites.net/api/products')
        .then(response => response.data)
        .then(data => this.setState({ products: data }, () => this.renderTableData()))
        .catch(error => console.error(error));
    }

    renderTableData = async () => {
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
        this.setState({ forceUpdate: !this.state.forceUpdate });
    }

    componentDidMount() {
        this.getProducts();
    }

    onAddProduct = async () => {
        this.setState({ selectedProduct: null, showModal: true}, () => this.forceUpdateState());
    }

    onUpdateProduct = (id) => {
        if (!id) {
            console.error('Invalid product id');
            return;
        }

        const product = this.state.products.find(c => c.id === id);

        if (!product) {
            console.error('Product not found');
            return;
        }

        this.setState({ selectedProduct: product, showModal: true}, () => this.forceUpdateState());
    }

    onDeleteProduct = (id) => {
        if (!id) {
            console.error('Invalid product id');
            return;
        }

        const product = this.state.products.find(c => c.id === id);

        if (!product) {
            console.error('Product not found');
            return;
        }

        this.setState({ selectedProduct: product, showDeleteModal: true}, () => this.forceUpdateState());
    }

    handleSave = async (product) => {
        if (!product) {
            console.error('Invalid product');
            return;
        }

        try {
            const response = await axios.post('https://store-onboarding.azurewebsites.net/api/products', product);
            if (!response.data) {
                console.error('No data in response');
                return;
            }
            
            this.getProducts();
            this.setState({ showModal: false }, () => this.forceUpdateState());
        } catch (error) {
            console.error(error);
        }
    }

    handleEdit = async (product) => {
        if (!product) {
            console.error('Invalid product');
            return;
        }

        try {
            const response = await axios.put(`https://store-onboarding.azurewebsites.net/api/products/${product.id}`, product);
            if (!response.data) {
                console.error('No data in response');
                return;
            }
              
            this.getProducts();
            this.setState({ showModal: false }, () => this.forceUpdateState());
        } catch (error) {
            console.error(error);
        }
    }

    handleDelete = async (id) => {
        if (!id) {
            console.error('Invalid product id');
            return;
        }

        try {
            const response = await axios.delete(`https://store-onboarding.azurewebsites.net/api/products/${id}`);
            if (response.status !== 204) {
                console.error('Unexpected status code: ' + response.status);
                return;
            }

            this.getProducts();
            this.setState({ showDeleteModal: false }, () => this.forceUpdateState());
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        return (
            <>
                <Home />
                <div style={{textAlign: 'left', padding: '10px 0'}}>
                    <Button color='blue' onClick={() => this.onAddProduct()}>New Product</Button>
                </div>
                {this.state.showModal && <ProductModal show={this.state.showModal} 
                        handleClose={() => this.setState({ showModal: false }, () => this.forceUpdateState())} 
                        handleSave={this.handleSave} 
                        handleEdit={this.handleEdit} 
                        handleDelete={this.handleDelete}
                        product={this.state.selectedProduct}
                    />
                }
                {this.state.showDeleteModal && <DeleteModal show={this.state.showDeleteModal}
                        handleClose={() => this.setState({ showDeleteModal: false }, () => this.forceUpdateState())}
                        handleDelete={this.handleDelete} 
                        selectedResource={this.state.selectedProduct}
                        resourceName='product'
                    />
                }
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