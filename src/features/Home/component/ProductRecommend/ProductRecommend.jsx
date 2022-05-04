import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../../constants/index';
import { useHistory } from 'react-router-dom';
import './styleproduct.scss';
import imgfreeship from '../../../../assets/fs/tiki-fast.png';

ProductRecommend.propTypes = {
  product: PropTypes.object,
};

function ProductRecommend({ product }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick} className="frameproductrecommend">
      <Box className="frameitemproduct-inside">
        <Box className="frameimageproductrecommend">
          <img src={imgfreeship} className="imgfreeshipinside" alt="" />

          <Box className="frameimagemain">
            <img src={product.thumbnail} alt={product.name} className="imageproductrc" />
          </Box>
        </Box>

        <Box className="frametitleproductrc">
          <Typography variant="body2">{product.name}</Typography>
          <Typography variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
            </Box>
            {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductRecommend;
