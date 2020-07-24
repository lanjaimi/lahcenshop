import React, { Component } from 'react';
import SingleProduct from './SingleProduct';
import axios from 'axios';

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
  }

  updateData = (pathname) => {
    if (pathname.includes('/category')) {
      console.log('/api' + pathname);
      axios
        .get('/api' + pathname)
        .then((res) => {
          this.setState({
            result: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.updateData(location.pathname);
    });
  }
  componentDidMount = () => {
    this.updateData(this.props.location.pathname);
  };

  render() {
    if (this.state.result === null) return <div />;

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

export default CategoryPage;
