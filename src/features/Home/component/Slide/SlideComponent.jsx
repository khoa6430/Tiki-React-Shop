import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.scss';
import { data } from '../../component/Slide/data';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import './style.scss';
import { Box } from '@mui/system';

SlideComponent.propTypes = {};
const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick, currentSlide } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos className="iconarrow" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos className="iconarrow" />
    </div>
  );
};
const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  initialSlide: 2,
  infinite: true,

  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
      },
    },
  ],
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function SlideComponent(props) {
  return (
    <div className="carousel">
      <Slider {...carouselProperties}>
        {data.map((item) => (
          <img src={item.imgUrl} alt="" className="imgslidecp" />
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponent;
