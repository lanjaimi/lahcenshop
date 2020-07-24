import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class CategCompo extends Component {
  render() {
    let imageSrc = require('../../images/' + this.props.category + '.png');

    return (
      <Fragment>
        <div
          className={`big_slide_categ col-lg-4 col-md-6 ${this.props.color}`}
        >
          <Link to={'/category/' + this.props.category}>
            <div className='call_box'>
              <span>
                {this.props.category}
                <div className='faIcon'>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </span>
            </div>
            <div className='img_box'>
              <img src={imageSrc} alt='' />
            </div>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default CategCompo;
