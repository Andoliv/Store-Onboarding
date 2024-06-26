import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Customer from './components/Customer';
import Product from './components/Product';
import Store from './components/Store';
import Sales from './components/Sales';

export default function App() {

    return (
        <>      
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="customer" element={<Customer />} /> 
                <Route path="product" element={<Product />} />
                <Route path="store" element={<Store />} />
                <Route path="sales" element={<Sales />} />
            </Routes>
        </>
    );
}

