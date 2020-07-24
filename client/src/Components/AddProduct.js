import React, { Component } from 'react';
import '../styles/add_item.css';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faUpload } from '@fortawesome/free-solid-svg-icons';
import { categoryNames } from '../utils/staticData';
import { Link } from 'react-router-dom';
import '../styles/colors.css';
import axios from 'axios';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      images: [],
      uploadedImages: [],
      title: '',
      price: '',
      category: 'Select Category',
      description: '',
      dropdown: 'hide',
      rotate: '',
      success: 'hide',
      error: {
        msg: '',
        display: 'hide',
      },
    };
  }

  chaneDisplay = (e) => {
    if (this.state.dropdown === 'hide') {
      this.setState({
        dropdown: 'show',
        rotate: 'rotate',
      });
    } else {
      this.setState({
        dropdown: 'hide',
        rotate: '',
      });
    }
  };

  selectCategory = (cat) => {
    this.setState({
      category: cat,
      dropdown: 'hide',
      rotate: ' ',
    });
  };

  addImage = (event) => {
    let newImages = [...this.state.images];
    let newFiles = [...this.state.uploadedImages];
    console.log(event.target.files);
    console.log(this.state.images.length);

    try {
      if (this.state.images.length > 3) {
        this.setState({
          error: {
            msg: 'you can upload a maximum of 4 images!!',
            display: 'show',
          },
        });
        return;
      }
      if (event.target.files[0].size > 3000000) {
        this.setState({
          error: {
            msg: 'The maximum file allowed is 3 Megabytes!!',
            display: 'show',
          },
        });
        return;
      }

      newImages.push(URL.createObjectURL(event.target.files[0]));
      newFiles.push(event.target.files[0]);
    } catch (err) {
      console.log(err);
    }

    this.setState({
      images: newImages,
      uploadedImages: newFiles,
    });
  };

  deleteImage = (imgSrc) => {
    let newImages = [];
    let newFiles = [];

    for (let i = 0; i < this.state.images.length; i++) {
      if (this.state.images[i] !== imgSrc) {
        newImages.push(this.state.images[i]);
        newFiles.push([this.state.uploadedImages[i]]);
      }
    }

    this.setState({
      images: newImages,
      uploadedImages: newFiles,
    });
  };

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  changePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  checkErrors = () => {
    const { title, price, description, category, uploadedImages } = this.state;
    switch (true) {
      case uploadedImages.length < 1:
        this.setState({
          error: {
            msg: 'You need to upload at least one image!!',
            display: 'show',
          },
        });
        break;

      case title.length < 10:
        this.setState({
          error: {
            msg: 'The title must be at least 10 chrachters long!!',
            display: 'show',
          },
        });
        break;
      case isNaN(price) || price === '':
        this.setState({
          error: {
            msg: 'The price must be a Number!!',
            display: 'show',
          },
        });
        break;
      case category === 'Select Category':
        this.setState({
          error: {
            msg: 'You need to select a category !!',
            display: 'show',
          },
        });
        break;
      case description.length < 20:
        this.setState({
          error: {
            msg: 'The Description must be at least 20 chrachters long!!',
            display: 'show',
          },
        });
        break;
      default:
        return;
    }
  };

  submit = () => {
    this.checkErrors();
    const { title, price, category, description, uploadedImages } = this.state;
    let product = new FormData();

    product.append('title', title);
    product.append('price', price);
    product.append('category', category);
    product.append('description', description);

    for (let i = 0; i < uploadedImages.length; i++) {
      product.append(`uploadedImages`, uploadedImages[i]);
    }

    axios
      .post('/api/product', product)
      .then((res) => {
        console.log(res.data._id);
        this.setState({
          dropdown: 'hide',
          rotate: '',
          success: 'show',
          images: [],
          uploadedImages: [],
          title: '',
          price: '',
          category: 'Select Category',
          description: '',
          _id: res.data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const options = categoryNames.map((cat, index) => {
      return (
        <li
          key={index}
          cat={cat}
          onClick={() => {
            this.selectCategory(cat);
          }}
        >
          {cat}
        </li>
      );
    });

    let images = this.state.images.map((imgSrc, index) => {
      return (
        <div key={index} className='single_image col-lg-2 col-md-4 col-sm-4'>
          <div
            className='delete_btn'
            onClick={() => {
              this.deleteImage(imgSrc);
            }}
          >
            X
          </div>
          <img src={imgSrc} alt='product' />
        </div>
      );
    });

    return (
      <div className='add_item '>
        <div className={`error_msg ${this.state.error.display}`}>
          {this.state.error.msg}
        </div>
        <div className='images_container'>
          <div className='file_box'>
            <label>
              <span>
                <FontAwesomeIcon icon={faUpload} />
              </span>
              Choose Image
            </label>
            <input
              type='file'
              name='file'
              className='inputfile'
              accept='image/*'
              onChange={this.addImage}
            />
          </div>
          <div className='image_box row'>{images}</div>
        </div>
        <div className='title'>
          <span>Title</span>
          <input
            name='title'
            type='text'
            onChange={this.changeTitle}
            value={this.state.title}
            placeholder='Name, brand, model, etc.'
          />
        </div>
        <div className='price'>
          <span>Price</span>
          <input
            onChange={this.changePrice}
            value={this.state.price}
            name='price'
            type='text'
            placeholder='0.00'
          />
        </div>
        <div className='cat'>
          <span className='label'>Category</span>
          <span onClick={this.chaneDisplay} className='selected_cat'>
            <div className={this.state.rotate}>
              <FontAwesomeIcon icon={faSortDown} />
            </div>
            {this.state.category}
          </span>
          <ul className={`categories_list ${this.state.dropdown}`}>
            {options}
          </ul>
        </div>

        <div className='description'>
          <span>Description</span>
          <textarea
            value={this.state.description}
            onChange={this.changeDescription}
            placeholder='Write a description for the product!'
          />
        </div>
        <Link to={`/product/${this.state._id}`}>
          <div className={`view ${this.state.success}`}>View your product</div>
        </Link>

        <div className='submit' onClick={this.submit}>
          Submit
        </div>
      </div>
    );
  }
}
export default AddItem;
