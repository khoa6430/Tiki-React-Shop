import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { multiData } from '../SlideTabCategory/multidata';
import Slider from 'react-slick';
import './multicarousel.scss';
import { Box } from '@material-ui/core';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
SlideTabCategory.propTypes = {};
const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick, currentSlide } = props;
  return (
    <div className={className} onClick={onClick} style={currentSlide === 0 ? { display: 'none' } : {}}>
      <ArrowBackIos style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
};
const NextBtn = (props) => {
  // console.log(props);
  const { className, onClick, currentSlide } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={currentSlide === 6 ? { display: 'none' } : { marginLeft: '-10px' }}
    >
      <ArrowForwardIos style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 11,
  infinite: false,
  slidesToScroll: 11,
  // centerPadding: "170px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const Card = ({ item }) => {
  const history = useHistory();
  var handleProductClick = () => {
    history.push(`/products/`);
  };
  return (
    // <div className="frame-listcategoryslide" onClick={handleProductClick}>
    <div className="frametilecategoryitem" onClick={handleProductClick}>
      {item}
    </div>
    // </div>
  );
};

function SlideTabCategory(props) {
  var listProduct = [
    'Nhà Cửa',
    'Điện tử',
    'Thời trang nữ',
    'Khẩu trang',
    'Làm đẹp',
    'Thời trang nam',
    'Laptop',
    'Ổ cứng',
    'Điện thoại',
    'Sách',
    'Giày nữ',
    'Giày nam',
    'Thể thao',
    'Máy ảnh',
  ];
  return (
    <div className="carouseltabcategory">
      <Slider {...carouselProperties}>
        {listProduct.map((item) => (
          <Card item={item} key={item} />
        ))}
      </Slider>
    </div>
  );
}

export default SlideTabCategory;
