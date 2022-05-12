import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { data } from '../../component/SlideCategory/data';
import { Box } from '@material-ui/core';
import './multicarousel.scss';
import { display } from '@mui/system';
import { useHistory } from 'react-router-dom';
const carouselProperties = {
  infinite: false,
  slidesToShow: 5,
  rows: 2,
  slidesPerRow: 2,
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
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const Card = ({ item }) => {
  return (
    <Box className="boxItemCategory" style={{ height: '180px', marginTop: '10px', padding: '10px 15px' }}>
      <Box>
        <img
          className="multi__imagecategory"
          src={item.urlProduct}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <span className="titleproduct" style={{ fontSize: '15px', lineHeight: '20px' }}>
        {item.nameProduct}
      </span>
    </Box>
  );
};

function SlideCategory(props) {
  const history = useHistory();
  const handleClick = (item) => {
    console.log(item);
    history.push('/products/');
  };
  return (
    <div className="carouselCategory">
      <Box
        style={{
          background: 'white',
          borderBottomLeftRadius: '10px',
          paddingTop: '15px',
          borderBottomRightRadius: '10px',
        }}
      >
        <Box className="titlecategory">
          <span style={{ fontSize: '20px', marginLeft: '10px' }}>Danh mục nổi bật</span>
        </Box>
        <Box className="framcarouselcategory">
          <Slider {...carouselProperties}>
            {data.map((item) => (
              <div key={item.nameProduct} onClick={() => handleClick(item)}>
                <Card item={item} />
              </div>
            ))}
          </Slider>
        </Box>
      </Box>
    </div>
  );
}

export default SlideCategory;
