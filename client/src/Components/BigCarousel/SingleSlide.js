import React, { Component } from 'react';
import '../../styles/single_big_slide.css';
import CallToActComp from './CallToActComp';
import CategCompo from './CategCompo';
import '../../styles/colors.css';
import ImageComp from './ImageComp';

class SingleSlide extends Component {
  render() {
    if (this.props.content.bigImage === null) {
      return (
        <div className='single_product_showcase row'>
          <CallToActComp content={this.props.content} />
          <CategCompo
            category={this.props.content.category1}
            color={this.props.content.color2}
          />
          <CategCompo
            category={this.props.content.category2}
            color={this.props.content.color3}
          />
        </div>
      );
    } else {
      return (
        <div className='single_product_showcase row'>
          <CallToActComp content={this.props.content} />
          <ImageComp
            color={this.props.content.color}
            imageName={this.props.content.bigImage}
          />
        </div>
      );
    }
  }
}

export default SingleSlide;
