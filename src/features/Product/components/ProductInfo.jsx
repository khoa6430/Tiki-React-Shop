import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { formatPrice } from '../../../utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },

  pricebox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  box2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    color: 'rgb(255, 66, 78)',
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    textDecoration: 'line-through',
    padding: theme.spacing(2),
  },
  promotionPercent: {
    padding: theme.spacing(2),
  },
}));
function ProductInfo({ product = {} }) {
  const classes = useStyles();

  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  // console.log(name);

  return (
    <Box>
      <Box className={classes.box2}>
        <Typography component="h1" variant="h4" align="left">
          {name}
        </Typography>
        <Typography variant="body2" className={classes.description} align="left">
          {shortDescription}
        </Typography>
      </Box>
      <Box className={classes.pricebox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {' '}
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>{`-${product.promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
