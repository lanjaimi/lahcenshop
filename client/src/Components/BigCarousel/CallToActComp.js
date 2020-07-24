import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class CallToActComp extends Component {
  render() {
    return (
      <Fragment>
        <div className={`text col-lg-4 col-md-6   ${this.props.content.color}`}>
          <h1>{this.props.content.heading}</h1>
          <h2>{this.props.content.subHeading}</h2>
          <Link to={'/category/' + this.props.content.callToActCat}>
            <div className='icon_box '>
              <span>
                {this.props.content.callToAct}
                <div className='faIcon'>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </span>
            </div>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default CallToActComp;
