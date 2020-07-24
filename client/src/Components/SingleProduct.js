import React, { Component, Fragment } from 'react';
import '../styles/single_product.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';

class SingleProduct extends Component {
  truncate = (str) => {
    return str.length > 30 ? str.substr(0, 29) + '...' : str;
  };
  render() {
    let imgSrc = '/' + this.props.data.imagePaths[0];

    return (
      <Fragment>
        <div className='single_product col-lg-3 col-md-4 col-sm-4'>
          <Link to={'/product/' + this.props.data._id}>
            <img className='image' src={imgSrc} alt='product' />
            <h2 className='title'>{this.truncate(this.props.data.title)}</h2>
            <div className='price'>
              <span>${this.props.data.price}</span>
              <div className='shipping'>
                <FontAwesomeIcon icon={faShippingFast} />
                <span>Free Shipping</span>
              </div>
            </div>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default SingleProduct;
