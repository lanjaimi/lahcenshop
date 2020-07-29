import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import BigCarousel from './Components/BigCarousel/BigCarousel';
import CategoriesShowcase from './Components/CategoriesShowcase';
import ProductPage from './Components/ProductPage';
import CategoryPage from './Components/CategoryPage';
import AddProduct from './Components/AddProduct';
import SearchPage from './Components/SeachPage';
import RandomProducts from './Components/RandomProducts';
import LastAdded from './Components/LastAdded';
import ShoppingCart from './Components/ShoppigCart';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  addToCart = (item, quantity) => {
    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i]._id === item._id) {
        this.setState({
          added: '',
        });
        return;
      }
    }

    console.log('added');

    item.quantity = quantity;

    const newCart = [...this.state.cart];

    newCart.push(item);

    this.setState({
      cart: newCart,
      added: 'added',
    });
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Route
            path='/'
            render={(props) => (
              <NavBar items={this.state.cart.length} {...props} />
            )}
          />
          <div className='appBody'>
            <Route exact path='/' component={BigCarousel} />
            <Route exact path='/' component={LastAdded} />
            <Route
              exact
              path='/'
              render={(props) => (
                <CategoriesShowcase
                  heading='Hello, '
                  startIndex={0}
                  endIndex={6}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path='/'
              render={(props) => (
                <RandomProducts
                  heading='Todays Deals – All With Free Shipping- Carousel'
                  {...props}
                />
              )}
            />
            <Route
              exact
              path='/'
              render={(props) => (
                <CategoriesShowcase
                  heading='More Product, '
                  startIndex={6}
                  endIndex={12}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path='/product/:id'
              render={(props) => (
                <ProductPage addToCart={this.addToCart} {...props} />
              )}
            />
            <Route
              exact
              path='/shoppingCart'
              render={(props) => (
                <ShoppingCart items={this.state.cart} {...props} />
              )}
            />
            <Route exact path='/addProduct' component={AddProduct} />
            <Route exact path='/category/:category' component={CategoryPage} />
            <Route exact path='/search' component={SearchPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
