import React, { Component } from 'react';
import ProductCarousel from './ProductCarousel';
import axios from 'axios';

export default class RandomProducts extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      result: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/random')
      .then((res) => {
        this.setState({
          result: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (this.state.result === null) return <div />;

    return (
      <ProductCarousel
        heading={this.props.heading}
        result={this.state.result}
      />
    );
  }
}
