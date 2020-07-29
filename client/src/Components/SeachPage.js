import React, { Component, Fragment } from 'react';
import SingleProduct from './SingleProduct';
import axios from 'axios';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    const searchQuery = this.props.location.search.replace('?q=', '');

    axios
      .get('/api' + this.props.location.pathname + this.props.location.search)
      .then((res) => {
        console.log(res.data);
        this.setState({
          result: res.data,
          searchQuery,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.result.length === 0) {
      return (
        <Fragment>
          <div className='no_items_msg'>
            No resluts matching {'" ' + this.state.searchQuery + ' "'}
          </div>
        </Fragment>
      );
    } else {
      let products = this.state.result.map((data, index) => {
        return <SingleProduct key={index} data={data} />;
      });

      return (
        <div className='countainer'>
          <div className='row'>{products}</div>
        </div>
      );
    }
  }
}

export default SearchPage;
