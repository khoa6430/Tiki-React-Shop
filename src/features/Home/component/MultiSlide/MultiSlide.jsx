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
import { set, ref, onValue, remove, update, get } from 'firebase/database';
import { db } from '../../../../firebase';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  var handleProductClick = (itemid) => {
    history.push(`/products/${itemid}`);
  };
  return (
    <div
      className="boxItemFS"
      onClick={() => {
        handleProductClick(item.id);
      }}
    >
      <Box>
        <img
          className="multi__image"
          src={item.thumbnail}
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
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}
        </span>
        <span className="percentprice">-{item.promotionPercent}%</span>
      </Box>
      <Box style={{ marginTop: '5px', paddingLeft: '5px', paddingBottom: '15px', borderRadius: '10px' }}>
        <Box className="deals__qty">
          <Box className="deals__progress"></Box>
          <span className="vmb">Vừa mở bán</span>
        </Box>
      </Box>
    </div>
  );
};

var getData = [];
//GET DATA IN FIRST RENDER
var idproductDefault = [
  7942588, 24076826, 25490943, 9239246, 26629978, 22004565, 13682172, 8013507, 26720271, 8967443, 13637898, 20540129,
];
//   var data2 = [];
for (var i = 0; i < idproductDefault.length; i++) {
  onValue(
    ref(db, `/list-product/${idproductDefault[i]}`),
    (snapshot) => {
      //do firebase
      const data = snapshot.val();
      if (data !== null) {
        getData.push(data);
      }
    },
    {
      onlyOnce: true,
    }
  );
}

function MultiSlide(props) {
  const [listproduct, setListProduct] = useState(getData);

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
            {listproduct.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </Slider>
        </Box>
      </Box>
    </div>
  );
}

export default MultiSlide;
