import React, { Component, Fragment } from 'react';
import SingleProduct from './SingleProduct';
import axios from 'axios';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchQuery: '',
    };
  }

  updateData = (pathname, search) => {
    axios
      .get('/api/' + pathname + search)
      .then((res) => {
        this.setState({
          result: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.updateData(location.pathname, location.search);
      this.setState({
        searchQuery: location.search.replace('?query=', ''),
      });
    });
  }

  componentDidMount() {
    this.updateData(this.props.location.pathname, this.props.location.search);
  }

  render() {
    if (this.state.result === null || this.state.result.length === 0) {
      return (
        <Fragment>
          <div className='no_items_msg'>
            No resluts matching {'" ' + this.state.searchQuery + ' "'}
          </div>
        </Fragment>
      );
    }

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

export default SearchPage;
