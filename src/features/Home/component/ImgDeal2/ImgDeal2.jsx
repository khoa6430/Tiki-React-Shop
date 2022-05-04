import React from 'react';
import PropTypes from 'prop-types';
import img1 from '../../../../assets/imgdeal2/1.png';
import img2 from '../../../../assets/imgdeal2/2.png';
import img3 from '../../../../assets/imgdeal2/3.png';
import img4 from '../../../../assets/imgdeal2/4.png';
import { Box } from '@material-ui/core';
import './ImgStyles.scss';
ImgDeal2.propTypes = {};

function ImgDeal2(props) {
  return (
    <Box className="imgdeal2frame">
      <img src={img1} className="imgDeal1" alt="" srcset="" />
      <img src={img2} className="imgDeal2" alt="" srcset="" />
      <img src={img3} className="imgDeal3" alt="" srcset="" />
      <img src={img4} className="imgDeal4" alt="" srcset="" />
    </Box>
  );
}

export default ImgDeal2;
