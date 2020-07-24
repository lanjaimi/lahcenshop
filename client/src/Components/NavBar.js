import React, { Component, Fragment } from 'react';
import logo from '../images/logo_white.png';
import '../styles/nav_bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBars,
  faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { categoryNames } from '../utils/staticData';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuDisplay: 'hide',
    };
  }

  chaneMenuDisplay = (e) => {
    if (this.state.menuDisplay === 'hide') {
      this.setState({
        menuDisplay: 'show',
        input: ' ',
      });
    } else {
      this.setState({
        menuDisplay: 'hide',
      });
    }
  };

  changeInput = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    let categories = categoryNames.map((cat, index) => {
      return (
        <Link key={index} to={'/category/' + cat}>
          <div key={index} className='item '>
            {cat}
          </div>
        </Link>
      );
    });
    return (
      <Fragment>
        <div className='navbar_wrapper'>
          <div className='navbar row'>
            <Link to='/'>
              <div className='logo_wrapper col-2'>
                <img className='logo' src={logo} alt='logo' />
              </div>
            </Link>

            <div className='search_warpper col-9'>
              <div className='box-wrapper '>
                <div className='search_icon search'>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  type='text'
                  name='search_box'
                  onChange={this.changeInput}
                  value={this.state.input}
                  className='search_box'
                  placeholder='Search for items ...'
                />
              </div>

              <span className='go_btn'>
                <Link to={'/search/d?query=' + this.state.input}>Go</Link>
              </span>
            </div>
            <div className='burger_warpper'>
              <div onClick={this.chaneMenuDisplay} className='burger_menu'>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
            <div
              className={`add_product ${this.state.menuDisplay}`}
              onClick={this.chaneMenuDisplay}
            >
              <Link to='/addProduct'>Add a product +</Link>
            </div>
            <div className='cart'>
              <Link to='/shoppingCart'>
                <span className='notification'>{this.props.items}</span>
                <span className='icon'>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className='elements'>{categories}</div>
      </Fragment>
    );
  }
}
export default NavBar;
