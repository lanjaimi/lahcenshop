import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopping_cat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';

export default class ShoppigCart extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  calculateTotal = (items) => {
    if (items.length > 0) {
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
      }

      this.setState({
        total: Math.round(total * 100) / 100,
      });
    }
  };

  componentDidMount() {
    this.calculateTotal(this.props.items);
  }

  render() {
    if (this.props.items.length === 0)
      return (
        <div className='no_items_msg'>
          The shopping cart is empty. Try Adding some stuff !!!
        </div>
      );

    console.log(this.props.items);

    let boxs = this.props.items.map((item, index) => {
      let imgSrc = item.imagePaths[0];

      return (
        <Link to={'/product/' + item._id}>
          <div key={index} className='shopping_cart'>
            <img className='image' src={imgSrc} alt='product' />
            <h4 className='title'>{item.title}</h4>
            <div className='price'>
              <span>Price:</span>
              <span>${item.price}</span>
            </div>
            <div className='quantity'>
              <span>Quantity:</span>
              <span>{item.quantity}</span>
            </div>
            <div className='shipping'>
              <FontAwesomeIcon icon={faShippingFast} />
              <span>Free Shipping</span>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className='shopping_cart_container'>
        {boxs}
        <div className='total_box'>
          <h4>Total:</h4>
          <div className='total'>{this.state.total}</div>
        </div>
      </div>
    );
  }
}
