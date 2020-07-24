import React, { Component } from 'react';
import { categoryNames } from '../utils/staticData';
import { Link } from 'react-router-dom';

class NavList extends Component {
  constructor() {
    super();
  }
  render() {
    let categories = categoryNames.map((cat, index) => {
      return (
        <Link key={index} to={'/category/' + cat}>
          <div key={index} className=' item col-lg-1 col-md-2 col-sm-4'>
            <span>{cat}</span>
          </div>
        </Link>
      );
    });

    return (
      <div className='container'>
        <div className='elements row'>{categories}</div>
      </div>
    );
  }
}

export default NavList;
