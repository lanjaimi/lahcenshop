import React, { Component } from 'react';
import '../styles/product_carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductCarousel extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      result: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/latest')
      .then((res) => {
        this.setState({
          result: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  truncate = (str) => {
    return str.length > 40 ? str.substr(0, 39) + '...' : str;
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
    };

    const productList = this.props.result.map((product, index) => {
      let imgSrc = '/' + product.imagePaths[0];
      return (
        <div key={index} className='product'>
          <Link to={'/product/' + product._id}>
            <div className='image'>
              <img src={imgSrc} alt='product' />
            </div>

            <h2 className='title'>
              <span>{this.truncate(product.title)}</span>
            </h2>
            <span className='price'>${product.price}</span>
            <span className='shipping'>Free Shipping</span>
          </Link>
        </div>
      );
    });

    return (
      <div className='product_carousel'>
        <h1 className='heading'>{this.props.heading}</h1>
        <Slider {...settings}>{productList}</Slider>
      </div>
    );
  }
}

export default ProductCarousel;
