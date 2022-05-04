import React from 'react';
import PropTypes from 'prop-types';
import img1 from '../../../../assets/imgdeal/1.png';
import img2 from '../../../../assets/imgdeal/2.png';
import img3 from '../../../../assets/imgdeal/3.png';
import './ImgStyle.scss';
ImgDeal.propTypes = {
    
};

function ImgDeal(props) {
    return (
        <div className='label-custom'>
            <img src={img1} className='img1' alt=''/>
            <img src={img2} className='img2' alt=''/>
            <img src={img3} className='img3' alt=''/>
        </div>
    );
}

export default ImgDeal;