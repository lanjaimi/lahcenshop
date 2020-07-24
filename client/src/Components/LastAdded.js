import React, { Component } from 'react';
import ProductCarousel from './ProductCarousel';
import axios from 'axios';

export default class LastAdded extends Component {
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
  render() {
    if (this.state.result === null) return <div />;

    return (
      <ProductCarousel
        heading='Recently Added Items'
        result={this.state.result}
      />
    );
  }
}
