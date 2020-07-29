import React, { Component } from 'react';
import SingleProduct from './SingleProduct';
import axios from 'axios';

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      catName: '',
    };
  }

  componentDidMount() {
    axios
      .get('/api' + this.props.location.pathname)
      .then((res) => {
        this.setState({
          result: res.data.data,
          catName: res.data.catName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.result === null) return <div />;

    let products = this.state.result.map((data, index) => {
      return <SingleProduct key={index} data={data} />;
    });

    return (
      <div className='countainer'>
        <div className='product_page_header'>{this.state.catName}</div>

        <div className='row'>{products}</div>
      </div>
    );
  }
}

export default CategoryPage;
