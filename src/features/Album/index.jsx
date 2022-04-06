import React from 'react';
//import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id:1,
            name:'VPOP THÁNG 1/2022',
            thumbnaiUrl:"https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/9/1/4/2/914296e9dee6b4df01b04f41665a6b6d.jpg"
        },
        {
            id:2,
            name:'Throwback Teen pop',
            thumbnaiUrl:"https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/7/5/d/d/75dd3826e617fa30bf1c64ef9abfe301.jpg"
        },
        {
            id:3,
            name:'KPOP HITS',
            thumbnaiUrl:"https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/f/3/8/b/f38b644157befefcd23e88420237b6bd.jpg"
        },

    ]
    return (
        <div>
            <h2>CÓ THẺ BẠN SẼ THÍCH </h2>
            <AlbumList albumList={albumList}/>
        </div>
    );
}

export default AlbumFeature;