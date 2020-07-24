import React, { Component } from 'react';
import '../styles/categories.css';
import '../styles/colors.css';
import { categoryNames } from '../utils/staticData';
import { Link } from 'react-router-dom';

class CategoriesShowcase extends Component {
  render() {
    let cats = [];

    for (let i = this.props.startIndex; i < this.props.endIndex; i++) {
      let image = require('../images/' + categoryNames[i] + '.png');
      cats.push(
        <div key={i} className='single_cat col-lg-2 col-md-4 col-sm-4'>
          <Link to={'/category/' + categoryNames[i]}>
            <div className={`image_wrapper ${categoryNames[i]}`}>
              <img src={image} alt='category' />
            </div>
            <h3>{categoryNames[i]}</h3>
          </Link>
        </div>
      );
    }

    return (
      <div className='categories'>
        <h1>{this.props.heading}</h1>

        <div className='row'> {cats}</div>
      </div>
    );
  }
}
export default CategoriesShowcase;
