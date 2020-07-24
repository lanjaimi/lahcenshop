import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlickSlider from 'react-slick';
import '../../styles/big_slider.css';
import SingleSlide from './SingleSlide';
import { carouselCotent } from '../../utils/staticData';
class BigCarousel extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
    };

    const singleSlides = carouselCotent.map((slide, index) => {
      return <SingleSlide key={index} content={slide} />;
    });
    return (
      <div className='big_slider'>
        <SlickSlider {...settings}>{singleSlides}</SlickSlider>
      </div>
    );
  }
}

export default BigCarousel;
