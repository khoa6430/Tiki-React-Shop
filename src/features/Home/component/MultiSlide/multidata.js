import image1 from '../../../../assets/fs/img1.jpg';
import image2 from '../../../../assets/fs/img2.jpg';
import image3 from '../../../../assets/fs/img3.jpg';
import image4 from '../../../../assets/fs/img4.jpg';
import image5 from '../../../../assets/fs/img5.jpg';
import image6 from '../../../../assets/fs/img6.jpg';
import image7 from '../../../../assets/fs/img7.jpg';
import image8 from '../../../../assets/fs/img8.jpg';
import image9 from '../../../../assets/fs/img9.jpg';
import image10 from '../../../../assets/fs/img10.jpg';
import image11 from '../../../../assets/fs/img11.jpg';
import image12 from '../../../../assets/fs/img12.jpg';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../../firebase';


// export const multiData = [image1, image2, image3, image4, image5, image6,image7,image8,image9,image10,image11,image12];

// valueProduct48 = upcomingGamesList;
// console.log(valueProduct48);

//ITEM PRODUCT 48 NGUYEN TAC QUYEN LUC
var valueProduct48={};
  (async () => {
    try {

       await onValue(ref(db, `list-product/7942588`), (snapshot) => {
        valueProduct48 =  snapshot.val();
      
      
      });
    } catch (e) {
        // Deal with the fact the chain failed
    }

  })();




export const multiData = [
  // {
  //  imgUrl: valueProduct48.thumbnail,
  //   priceProduct: valueProduct48.salePrice,
  //   percentProduct: valueProduct48.promotionPercent,
  // },
  {
    imgUrl: image2,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image3,
    priceProduct: 123000,
    percentProduct: 21,
  },

  {
    imgUrl: image4,
    priceProduct: 123000,
    percentProduct: 21,
  },

  {
    imgUrl: image5,
    priceProduct: 123000,
    percentProduct: 21,
  },

  {
    imgUrl: image6,
    priceProduct: 123000,
    percentProduct: 21,
  },

  {
    imgUrl: image7,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image8,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image9,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image10,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image11,
    priceProduct: 123000,
    percentProduct: 21,
  },
  {
    imgUrl: image12,
    priceProduct: 123000,
    percentProduct: 21,
  },
];
// export default multiData;
