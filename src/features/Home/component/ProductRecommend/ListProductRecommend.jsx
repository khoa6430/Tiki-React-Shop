import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import ProductRecommend from './ProductRecommend';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import imagegy1 from '../../../../assets/todayrecommend/img1.png.webp';
import imagegy2 from '../../../../assets/todayrecommend/img2.png.webp';
import imagegy3 from '../../../../assets/todayrecommend/img3.png.webp';
import imagegy4 from '../../../../assets/todayrecommend/img4.png.webp';
import imagegy5 from '../../../../assets/todayrecommend/img5.png.webp';
import imagegy6 from '../../../../assets/todayrecommend/img6.png.webp';
import imagegy7 from '../../../../assets/todayrecommend/img7.png.webp';

ListProductRecommend.propTypes = {
  data: [],
};
ListProductRecommend.propTypes = {};

function ListProductRecommend({ data }) {
  const carouselProperties = {
    slidesToShow: 7,

    infinite: false,

    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
    ],
  };
  return (
    <div className="frameListProduct">
      <Box className="titlehyhn">Gợi ý hôm nay</Box>
      {/* SLIDE */}
      <div className="carouselProductRC">
        <Slider {...carouselProperties}>
          <Box className="frame-icon-main tab-active">
            <img src={imagegy1} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Dành cho bạn</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy2} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Deal Siêu Hot</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy3} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Rẻ vô đối</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy4} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Đi Chợ Siêu Sale</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy5} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Hàng mới</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy6} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Xu hướng thời trang</span>
          </Box>
          <Box className="frame-icon-main">
            <img src={imagegy7} alt="" srcset="" className="icon-gyhn" />
            <span className="titileforicon">Treding</span>
          </Box>
        </Slider>
      </div>
      {/* END SLIDE */}
      <Grid container style={{ marginTop: '0.5%' }}>
        {data.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={2} style={{ background: 'white' }}>
            <ProductRecommend product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListProductRecommend;
