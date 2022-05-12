import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import ProductRecommend from './ProductRecommend';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { set, ref, onValue, remove, update, get } from 'firebase/database';
import { db } from '../../../../firebase';
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

function ListProductRecommend({ data }) {
  var nameTitle = [
    {
      name: 'Dành cho bạn',
      urlImg: imagegy1,
      listIdProduct: [
        28077178, 12674526, 22558470, 8786742, 22831265, 23444200, 13682172, 8013507, 26720271, 8967443, 13637898,
        20540129,
      ],
    },
    {
      name: 'Deal Siêu Hot',
      urlImg: imagegy2,
      listIdProduct: [
        2094818, 24703737, 32106328, 29532449, 10755473, 22089692, 862605, 21772296, 23444628, 9856089, 24096965,
        9534554,
      ],
    },
    {
      name: 'Rẻ vô đối',
      urlImg: imagegy3,
      listIdProduct: [
        31397093, 23444401, 23843334, 3587846, 2475168, 28388799, 26716905, 26602214, 6544973, 7498962, 22065699,
        22158916,
      ],
    },
    {
      name: 'Đi Chợ Siêu Sale',
      urlImg: imagegy4,
      listIdProduct: [
        16751972, 18874017, 32106328, 29532449, 10755473, 22089692, 862605, 21772296, 23444628, 9856089, 24096965,
        9534554,
      ],
    },
    {
      name: 'Hàng mới',
      urlImg: imagegy5,
      listIdProduct: [
        2094818, 24703737, 32106328, 29532449, 10755473, 22089692, 862605, 21772296, 23444628, 9856089, 24096965,
        9534554,
      ],
    },
    {
      name: 'Xu hướng thời trang',
      urlImg: imagegy6,
      listIdProduct: [
        2094818, 24703737, 32106328, 29532449, 10755473, 22089692, 862605, 21772296, 23444628, 9856089, 24096965,
        9534554,
      ],
    },
    {
      name: 'Treding',
      urlImg: imagegy7,
      listIdProduct: [
        2094818, 24703737, 32106328, 29532449, 10755473, 22089692, 862605, 21772296, 23444628, 9856089, 24096965,
        9534554,
      ],
    },
  ];
  //GET DATA IN FIRST RENDER
  var getData = [];
  for (var i = 0; i < nameTitle[0].listIdProduct.length; i++) {
    onValue(
      ref(db, `/list-product/${nameTitle[0].listIdProduct[i]}`),
      (snapshot) => {
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
  const [productlist, setProductlist] = useState(getData);
  const [clicked, setClicked] = useState(nameTitle[0].name);
  const getProductFireBase = (listid) => {
    var getData = [];

    for (var i = 0; i < listid.length; i++) {
      onValue(
        ref(db, `/list-product/${listid[i]}`),
        (snapshot) => {
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
    return getData;
  };
  const dealClick = (item) => {
    var data = getProductFireBase(item.listIdProduct);
    setProductlist(data);
    setClicked(item.name);
  };
  return (
    <div className="frameListProduct">
      <Box className="titlehyhn">Gợi ý hôm nay</Box>
      {/* SLIDE */}
      <div className="carouselProductRC">
        <Slider {...carouselProperties}>
          {nameTitle.map((item) => (
            <div
              key={item.name}
              className={clicked == item.name ? 'frame-icon-main tab-active' : 'frame-icon-main'}
              onClick={() => dealClick(item)}
            >
              <img src={item.urlImg} alt="" className="icon-gyhn" />
              <span className="titileforicon">{item.name}</span>
            </div>
          ))}
        </Slider>
      </div>
      {/* END SLIDE */}
      <Grid container style={{ marginTop: '0.5%' }}>
        {productlist.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={2} style={{ background: 'white' }}>
            <ProductRecommend product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListProductRecommend;
