import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import './ServiceStyle.scss';
import img1 from '../../../../assets/servicesale/1.gif';
import img2 from '../../../../assets/servicesale/2.png';
import img3 from '../../../../assets/servicesale/3.png';
import img4 from '../../../../assets/servicesale/4.png';
import img5 from '../../../../assets/servicesale/5.png';
import img6 from '../../../../assets/servicesale/6.png';
import img7 from '../../../../assets/servicesale/7.png';
import img8 from '../../../../assets/servicesale/8.png';
import img9 from '../../../../assets/servicesale/9.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ServiceSale.propTypes = {};

const carouselProperties = {
  infinite: false,
  slidesToShow: 9,
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

function ServiceSale(props) {
  return (
    <Box className="frameService">
      <Slider {...carouselProperties}>
        <Box className="frameItemSv fram0">
          <img src={img1} alt="" className="imgsv" />
          <span className="textItem">Mua sắm có lời</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img2} alt="" className="imgsv" />
          <span className="textItem">Đi chợ siêu tốc</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img3} alt="" className="imgsv" />
          <span className="textItem">Mua bán ASA/XU</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img4} alt="" className="imgsv" />
          <span className="textItem">Mã giảm giá</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img5} alt="" className="imgsv" />
          <span className="textItem">Bảo hiểm Tiki360</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img6} alt="" className="imgsv" />
          <span className="textItem">Dịch vụ &amp; Tiện ích</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img7} alt="" className="imgsv" />
          <span className="textItem">Giảm đến 50%</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img8} alt="" className="imgsv" />
          <span className="textItem">Hoàn tiền 15%</span>
        </Box>
        <Box className="frameItemSv">
          <img src={img9} alt="" className="imgsv" />
          <span className="textItem">Ưu đãi thanh toán</span>
        </Box>
      </Slider>
    </Box>
  );
}

export default ServiceSale;
