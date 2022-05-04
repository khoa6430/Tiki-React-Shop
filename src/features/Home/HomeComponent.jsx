import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SlideComponent from '../Home/component/Slide/SlideComponent';
import { Box } from '@material-ui/core';
import './home.scss';
import imgside from '../../assets/img-side-carousel.png';
import MultiSlide from '../Home/component/MultiSlide/MultiSlide';
import ImgDeal from '../Home/component/ImgDeal/ImgDeal';
import ServiceSale from './component/ServiceSale/ServiceSale';
import ImgDeal2 from './component/ImgDeal2/ImgDeal2';
import SlideBrand from './component/SlideBrand/SlideBrand';
import SlideCategory from './component/SlideCategory/SlideCategory';
import ProductSkeletonsList from '../Product/components/ProductSkeletons';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../firebase';
import ListProductRecommend from '../Home/component/ProductRecommend/ListProductRecommend';

HomeComponent.propTypes = {};

function HomeComponent(props) {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        onValue(ref(db, '/list-product'), (snapshot) => {
          //do firebase
          const data = snapshot.val();
          var arr = [];
          if (data !== null) {
            Object.values(data).map((todo) => {
              arr.push(todo);
            });
            setProductList(arr.slice(0, 18));
          }
        });
      } catch (error) {
        console.log('Failed to fetch product list:', error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="root-page">
      <div>
        <Box className="framecarousel">
          <SlideComponent />
          <img src={imgside} className="imgsidecarousel" alt="" />
        </Box>
        <Box>
          <MultiSlide />
        </Box>
        <Box>
          <ImgDeal />
        </Box>
        <Box>
          <ServiceSale />
        </Box>
        <Box>
          <ImgDeal2 />
        </Box>
        <Box>
          <SlideBrand />
        </Box>
        <Box>
          <SlideCategory />
        </Box>
        <Box>{loading ? <ProductSkeletonsList length={16} /> : <ListProductRecommend data={productList} />}</Box>
      </div>
    </div>
  );
}

export default HomeComponent;
