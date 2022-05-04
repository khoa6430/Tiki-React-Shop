import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { multiData } from '../MultiSlide/multidata';
import Slider from 'react-slick';
import './multicarousel.scss';
import { Box } from '@material-ui/core';
import imgfreeship from '../../../../assets/fs/tiki-fast.png';
import imggiasoc from '../../../../assets/fs/giasoc.svg';
import imgflash from '../../../../assets/fs/dealflash.svg';
import imghomnay from '../../../../assets/fs/homnay.svg';
import CountdownTimer from '../../component/MultiSlide/CountDownTimer/CountdownTimer';
MultiSlide.propTypes = {};
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
  // console.log(props);
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
  slidesToScroll: 6,
  // centerMode: true,
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
  return (
    <Box className="boxItemFS">
      <Box>
        <img
          className="multi__image"
          src={item.imgUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            marginBottom: '10px',
          }}
        />
        <Box className="imagefreeship" style={{ width: '100px', height: '20px', zIndex: '100', marginTop: '-14%' }}>
          <img src={imgfreeship} style={{ width: '100%', height: '20px' }} alt="" />
        </Box>
      </Box>

      <Box style={{ display: 'flex', paddingLeft: '15px', height: '30px', marginTop: '5%' }}>
        <span className="dealprice">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.priceProduct)}
        </span>
        <span className="percentprice">-{item.percentProduct}%</span>
      </Box>
      <Box style={{ marginTop: '5px', paddingLeft: '5px', paddingBottom: '15px', borderRadius: '10px' }}>
        <Box className="deals__qty">
          <Box className="deals__progress"></Box>
          <span className="vmb">Vừa mở bán</span>
        </Box>
      </Box>
    </Box>
  );
};

function MultiSlide(props) {
  return (
    <div className="carousel2">
      <Box className="framegiasoc">
        <img src={imggiasoc} alt="" className="imggiasoc" />
        <img src={imgflash} alt="" className="imgflash" />

        <img src={imghomnay} alt="" className="imghomnay" />

        <Box className="boxCountDown">
          <CountdownTimer countdownTimestampMs={1659983662000} />
        </Box>
      </Box>

      <Box
        style={{
          paddingTop: '10px',
          background: 'white',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        <Box className="slidecarouselfs">
          <Slider {...carouselProperties}>
            {multiData.map((item) => (
              <Card item={item} />
            ))}
          </Slider>
        </Box>
      </Box>
    </div>
  );
}

export default MultiSlide;
