import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import useProductDetail from '../components/hooks/useProductDetail';
import ProductAdditional from '../components/Menu/ProductAdditional';
import ProductDescription from '../components/Menu/ProductDescription';
import ProductReviews from '../components/Menu/ProductReviews';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import { addToCart } from '../../Cart/cartSlice';
// import ProductInfo from '../components/ProductInfo';
// import AddToCartForm from '../components/AddToCartForm';
// import ProductMenu from '../components/ProductMenu';
// import ProductDescription from '../components/ProductDescription';
// import ProductAdditional from '../components/ProductAdditional';
// import ProductReviews from '../components/ProductReviews';
// import { addToCart } from '../../Cart/cartSlice';
import { set, ref, onValue, remove, update, get } from 'firebase/database';
import { db } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  const currentUser = useSelector((state) => state.user.current);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  async function getJSONAsync(dataFB) {
    onValue(ref(db, `list-cart/${currentUser.id}/${productId}`), (snapshot) => {
      var data = snapshot.val();
      return data;
    });
  }

  const handleAddToCartSubmit = (formValues) => {
    // console.log('form submit' ,formValues);
    //Use redux
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    dispatch(action);
    const productBuy = {
      id: product.id,
      product,
      quantity: formValues.quantity,
    };

    // SAVE ORDER TO FIREBASE
    onValue(
      ref(db, `list-cart/${currentUser.id}`),
      (snapshot) => {
        var data = snapshot.val();
        if (data) {
          data = Object.values(data);
          let index = _.findIndex(data, (cartProduct) => {
            return cartProduct.id == product.id;
          });
          if (index == -1) {
            //if product not exist in cart
            set(ref(db, `list-cart/${currentUser.id}/${productId}`), productBuy);
          } else {
            //  if product exist in cart ==> increase quantity
            // var getdata = getJSONAsync();
            // console.log(getdata);
            console.log('1');
            var getQuantityProduct;
            onValue(
              ref(db, `list-cart/${currentUser.id}/${productId}`),
              (snapshot) => {
                var data = snapshot.val();
                // getV(data);
                // console.log('data:', data);
                getQuantityProduct = data.quantity;
                console.log(getQuantityProduct);
                //   //increase quantity product
                set(ref(db, `list-cart/${currentUser.id}/${productId}`), {
                  ...productBuy,
                  quantity: formValues.quantity + getQuantityProduct,
                });
              },
              { onlyOnce: true }
            );
          }
        } else {
          //if cart haven't any product ==> add
          update(ref(db, `list-cart/${currentUser.id}/${productId}`), productBuy);
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper evalation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid
              item
              className={classes.right}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}
export default DetailPage;
