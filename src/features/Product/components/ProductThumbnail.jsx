import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';

ProductThumbnail.propTypes = {
    product:PropTypes.object,
};

function ProductThumbnail({product}) {
    // console.log(product.thumbnail.url);
    return (
        <Box>
            {/* <img src={product.thumbnail.url ? `${product.thumbnail.url}`
                    :`${product.thumbnail}`} alt={product.name} width="100%"/> */}
            <img src={product.thumbnail} alt={product.name} width="100%"/>
        </Box>
    );
}

export default ProductThumbnail;