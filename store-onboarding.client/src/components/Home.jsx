import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Home() {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (name) => setActiveItem(name);

  useEffect(() => {
    setActiveItem(activeItem);
  }, [activeItem]);

    return (
      <>
        <Menu inverted>
          <Menu.Item as={Link} to="/" name='home' 
            active={activeItem === 'home'} onClick={() => handleItemClick('home')}>React</Menu.Item>
          <Menu.Item as={Link} to="/customer" name='customers' 
            active={activeItem === 'customers'} onClick={() => handleItemClick('customers')}>Customers</Menu.Item>
          <Menu.Item as={Link} to="/product" name='products' 
            active={activeItem === 'products'} onClick={() => handleItemClick('products')}>Products</Menu.Item>
          <Menu.Item as={Link} to="/store" name='stores' 
            active={activeItem === 'stores'} onClick={() => handleItemClick('stores')}>Stores</Menu.Item>
          <Menu.Item as={Link} to="/sales" name='sales' 
            active={activeItem === 'sales'} onClick={() => handleItemClick('sales')}>Sales</Menu.Item>
        </Menu>
      </>
    );
}

export default Home;