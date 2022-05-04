import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './multicarousel.scss';
import { data } from '../../component/SlideProduct/data';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Box } from '@material-ui/core';

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
    <div className={className} onClick={onClick} style={currentSlide === 6 ? { display: 'none' } : {}}>
      <ArrowForwardIos style={{ color: 'blue', fontSize: '30px' }} />
    </div>
  );
};
const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 6,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: false,
  slidesToScroll: 6,
  // centerMode: true,
  // centerPadding: "170px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 4,
      },
    },
  ],
};
const Card = ({ item }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Box className="boxItemFS">
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
    <div className="carousel3">
      <Slider {...carouselProperties}>
        {data.map((item) => (
          <Card item={item} />
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponent;
