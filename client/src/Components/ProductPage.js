import React, { Component, Fragment } from 'react';
import CategoriesShowcase from './CategoriesShowcase';
import axios from 'axios';
import ReactImageZoom from 'react-image-zoom';
import '../styles/product_page.css';
import RandomProducts from './RandomProducts';

class ProductPage extends Component {
  constructor() {
    super();

    this.state = {
      product: null,
      clicked: null,
      quantity: 1,
    };
  }

  handleHover = (src) => {
    this.setState({
      clicked: src,
    });
  };

  componentDidMount() {
    axios
      .get('/api' + this.props.location.pathname)
      .then((res) => {
        this.setState({
          product: res.data,
          clicked: '/' + res.data.imagePaths[0],
          quantity: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeQuantity = (operation) => {
    if (operation === '+') {
      this.setState({
        quantity: this.state.quantity + 1,
      });
    } else {
      if (this.state.quantity > 1) {
        this.setState({
          quantity: this.state.quantity - 1,
        });
      }
    }
  };

  render() {
    if (this.state.product === null) return <div />;

    const { imagePaths, description, title, price } = this.state.product;

    if (imagePaths === undefined) {
      return <div />;
    }

    let images = this.state.product.imagePaths.map((src, index) => {
      let source = '/' + src;
      return (
        <img
          key={index}
          onMouseOver={() => {
            this.handleHover(source);
          }}
          src={source}
          alt='product'
        />
      );
    });

    let settings = {
      width: 400,
      height: 400,
      zoomWidth: 400,
      img: this.state.clicked,
      zoomPosition: 'right',
      zoomStyle: 'right:500px;',
    };

    return (
      <Fragment>
        <div className='product_page row'>
          <div className='title col-12'>{title}</div>
          <div className='col-lg-6 col-md-12'>
            <div className='photo_gallery row'>
              <div className='small_images col-2'>{images}</div>
              <div className='js_z col-10'>
                <ReactImageZoom {...settings} />
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-12'>
            <div className='product_info'>
              <div className='box'>
                <div className='price'>${price}</div>
                <div className='quantity'>
                  <span className='quantity_label'>Quantity:</span>
                  <span
                    className='controller'
                    onClick={() => {
                      this.changeQuantity('+');
                    }}
                  >
                    +
                  </span>
                  <span className='result'>{this.state.quantity}</span>
                  <span
                    className='controller'
                    onClick={() => {
                      this.changeQuantity('-');
                    }}
                  >
                    -
                  </span>
                </div>
                <div
                  className='to_cart_btn'
                  onClick={() => {
                    this.props.addToCart(
                      this.state.product,
                      this.state.quantity
                    );
                  }}
                >
                  Add to cart
                </div>
              </div>
              <div className='description'>
                <span className='label'>description</span>
                <p className='body'>{description}</p>
              </div>
            </div>
          </div>
        </div>
        <RandomProducts heading='check out these listings' />
        <CategoriesShowcase
          heading='browse more categories'
          startIndex={3}
          endIndex={9}
        />
      </Fragment>
    );
  }
}

export default ProductPage;
