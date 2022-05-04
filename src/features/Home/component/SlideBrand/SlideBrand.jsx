import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styleslidebrand.scss';
import { data } from '../../component/SlideBrand/data';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import SlideProduct from '../SlideProduct/SlideProduct';
import imgbrand from '../../../../assets/slidebrand/brandch.png';
SlideComponent.propTypes = {};
const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick, currentSlide } = props;
  return (
    <div className={className} onClick={onClick} style={currentSlide === 0 ? { display: 'none' } : {}}>
      <ArrowBackIos style={{ color: 'blue', fontSize: '30px' }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick, currentSlide } = props;
  return (
    <div className={className} onClick={onClick} style={currentSlide === 4 ? { display: 'none' } : {}}>
      <ArrowForwardIos style={{ color: 'blue', fontSize: '30px' }} />
    </div>
  );
};
const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 2,
  infinite: true,
  // autoplay : true,
  autoplaySpeed: 2000,
  dots: true,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};
const Card = ({ item }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Box className="boxItembrand">
        <Box>
          <img
            className="multi__image"
            src={item}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

function SlideComponent(props) {
  return (
    <div className="carouselBrand">
      <Box className="brandch">
        <img src={imgbrand} alt="" srcset="" style={{ width: '28px', height: '28px' }} />
        <span style={{ fontSize: '20px', marginLeft: '10px' }}>Thương hiệu chính hãng</span>
      </Box>
      <Box className="framecarouselbrand">
        <Slider {...carouselProperties}>
          {data.map((item) => (
            <Card item={item} />
          ))}
        </Slider>
      </Box>
      <Box>
        <SlideProduct />
      </Box>
    </div>
  );
}
export default SlideComponent;
