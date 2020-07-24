import React, { Component, Fragment } from 'react';

class ImageComp extends Component {
  render() {
    let imageSrc = require('../../images/' + this.props.imageName + '.png');
    return (
      <Fragment>
        <div
          className={`big_slider_image col-lg-8 col-md-6 ${this.props.color}`}
        >
          <img src={imageSrc} alt='' />
        </div>
      </Fragment>
    );
  }
}

export default ImageComp;
