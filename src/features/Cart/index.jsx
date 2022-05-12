import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Close, DeleteOutlined } from '@material-ui/icons';
import { get, onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import ProductThumbnail from '../Product/components/ProductThumbnail';
import { removeFromCart, removeAllFromCart } from './cartSlice';
import { cartTotalSelector } from './selector';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './style.scss';
import FormAddAddress from './FormAddress/FormAddAddress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
CartFeature.propTypes = {};

const useStyle = makeStyles((theme) => ({
  //   right: {
  //     [theme.breakpoints.down('xs')]: {},
  //     [theme.breakpoints.between('sm', 'md')]: {},
  //     '@media (min-width: 1280px)': {
  //       width: '350px',
  //       marginLeft: '10%',
  //     },
  //   },
  buttonmuahang: {
    color: theme.palette.getContrastText(red[500]),
    width: '100%',
    padding: '5%',
    marginTop: '5%',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));
var currentUser = {};

function CartFeature(props) {
  const classes = useStyle();
  const history = useHistory();
  const cartTotal = useSelector(cartTotalSelector);
  const currentUserID = useSelector((state) => state.user.current.id);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  var [allItemCart, setAllItemCart] = useState([]);

  const getItemCart = () => {
    onValue(
      ref(db, `list-cart/${currentUserID}`),
      (snapshot) => {
        var data = snapshot.val();
        console.log(currentUser.id);
        console.log(data);
        //convert object to array value
        if (data !== null) {
          data = Object.values(data);
          setAllItemCart(data);
          //delete last product have render again
        } else if (data == null) {
          setAllItemCart([]);
        }
      },
      { onlyOnce: true }
    );
  };

  useEffect(() => {
    onValue(
      ref(db, `/list-user/${currentUserID}`),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          currentUser = data;
        }
      },
      {
        onlyOnce: true,
      }
    );
  }, [open]);
  console.log(currentUser);
  const handleCloseWarning = (event, reason) => {
    //CLOSE WARNING DIALOG
    if (reason && reason == 'backdropClick') return;
    setOpenWarning(false);
  };

  useEffect(() => {
    getItemCart();
  }, []);
  console.log('item', allItemCart);
  const [selected, setSelected] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);
  const dispatch = useDispatch();

  const handleRemoveProduct = (idProduct) => {
    //Delete redux
    // const actionRemoveProduct = removeFromCart(idProduct);
    // dispatch(actionRemoveProduct);
    //Delete fire base
    // console.log("da remove",idProduct);
    remove(ref(db, `list-cart/${currentUser.id}/${idProduct}`));

    //Update Item Cart
    getItemCart();
    //If Item Has Selected
    for (var i = 0; i < selected.length; i++) {
      if (idProduct == Number(selected[i])) {
        selected.splice(i, 1);
      }
    }
    //Calculate again total price
    sumTotalOrder();
  };
  //Remove product had selected
  const handleRemoveAllProduct = () => {
    // const actionRemoveAllProduct = removeAllFromCart();
    // dispatch(actionRemoveAllProduct);

    if (allItemCart != null) {
      for (var j = 0; j < selected.length; j++) {
        console.log('DA REMOVE', selected[j]);
        remove(ref(db, `list-cart/${currentUser.id}/${selected[j]}`));
      }
    }
    setAllItemCart([]);
    //Remove Product Selected Had Remove ==> selected = 0;
    setSelected([]);

    sumTotalOrder();
  };

  // CHECK BOX
  //    Calculate total selected
  const sumTotalOrder = () => {
    var totalOrder = 0;
    if (allItemCart != null) {
      // for (var j = 0; j < selected.length; j++) {
      //   console.log(selected[j]);
      // }

      if (selected.length != 0) {
        for (var i = 0; i < allItemCart.length; i++) {
          for (var j = 0; j < selected.length; j++) {
            if (allItemCart[i].id == Number(selected[j])) {
              totalOrder += allItemCart[i].product.salePrice * allItemCart[i].quantity;
            }
          }
        }
        // console.log(totalOrder);
      }
      setTotalSelected(totalOrder);
      //return value;
    } else {
      //delete last product incart
      setTotalSelected(totalOrder);
    }
  };
  useEffect(() => {
    sumTotalOrder();
  }, [selected]);

  var isAllSelected;
  if (allItemCart != null) {
    isAllSelected =
      // allItemCart.length > 0 && selected.length === allItemCart.length;
      Object.keys(allItemCart).length > 0 && selected.length === Object.keys(allItemCart).length;
  } else {
    isAllSelected = false;
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (allItemCart != null) {
      if (value === 'all') {
        var getproductID = [];
        allItemCart.forEach((element) => {
          getproductID.push(element.id.toString());
        });

        setSelected(selected.length === Object.keys(allItemCart).length ? [] : getproductID);

        return;
      }
      // added below code to update selected options
      const list = [...selected];
      const index = list.indexOf(value);
      index === -1 ? list.push(value) : list.splice(index, 1);

      setSelected(list);
    }
  };

  var arrProductSelected = [];

  const handleBuy = () => {
    if (selected.length > 0) {
      //get product from cart user selected from state.selected to buy
      console.log('do dai ', allItemCart.length);
      for (var i = 0; i < allItemCart.length; i++) {
        for (var j = 0; j < selected.length; j++) {
          if (allItemCart[i].id == Number(selected[j])) {
            arrProductSelected.push(allItemCart[i]);
            //delete product from cart
            const actionRemoveProduct = removeFromCart(Number(selected[j]));
            dispatch(actionRemoveProduct);
            //delete product from firebase
            if (allItemCart != null) {
              for (var j = 0; j < selected.length; j++) {
                console.log('DA REMOVE', selected[j]);
                remove(ref(db, `list-cart/${currentUser.id}/${selected[j]}`));
              }
            }
          }
        }
      }
      history.push({
        pathname: '/thanks',
        state: {
          totalOrder: totalSelected,
          listProductSelected: arrProductSelected,
        },
      });

      //If cart haven't any product
    } else if (selected.length == 0) {
      setOpenWarning(true);
    }
  };
  var openForm = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    //my self
    //GET DATA WHEN USER UPDATE PRODUCT IN FIRST RENDER

    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  return (
    <Box className="rootpagecart">
      <Container>
        {/* <Paper evalation={0}>  */}
        <Grid container style={{ fontSize: '13px' }}>
          <Grid item className="leftcart" container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Paper evalation={0} className="framecartlistheader">
              <Box className="checkboxframetitle">
                <Checkbox
                  className="checkbox-title"
                  value="all"
                  checked={isAllSelected}
                  // indeterminate={checked[0] !== checked[1]}
                  // indeterminate={false}
                  onChange={handleChange}
                />
              </Box>
              <Box className="frameallproductcarttitle">Tất cả (sản phẩm)</Box>
              <Box className="framedongiatitle">Đơn giá</Box>
              <Box className="framesoluongtitle">Số lượng</Box>
              <Box className="framethanhtientitle">Thành tiền</Box>
              <Box
                className="frameicondeletetitle"
                style={{ marginLeft: '20px', paddingRight: '0px', cursor: 'pointer' }}
                onClick={() => handleRemoveAllProduct()}
              >
                {' '}
                <DeleteOutlined />
              </Box>
            </Paper>
            <Paper className="frameproductcartlist" evalation={0}>
              {allItemCart &&
                allItemCart.map((x) => (
                  <Box key={x.id} className="boxframe-oneproduct">
                    <Box className="framecheckbox-oneproduct" key={x.id}>
                      <Checkbox
                        value={x.id.toString()}
                        onChange={handleChange}
                        checked={selected.includes(x.id.toString())}
                      />
                    </Box>
                    <Box className="boximg-oneproduct">
                      <img className="img-oneproduct" src={x.product.thumbnail} alt={x.product.name} />
                    </Box>
                    <Box className="boxname-oneproduct">
                      <p>{x.product.name}</p>
                    </Box>

                    <Box className="boxsaleprice-oneproduct">
                      <p>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          x.product.salePrice
                        )}
                      </p>
                    </Box>
                    <Box className="boxquantity-oneproduct">
                      <p>{x.quantity}</p>
                    </Box>
                    <Box className="boxtotalmoney-oneproduct">
                      <p>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          x.quantity * x.product.salePrice
                        )}
                      </p>
                    </Box>
                    <Box className="deleteproduct-oneproduct" onClick={() => handleRemoveProduct(x.id)}>
                      <DeleteOutlined />
                    </Box>
                  </Box>
                ))}
            </Paper>
          </Grid>

          <Grid item className="rightcart">
            <Box>
              {/* ADDRESS USER */}
              {currentUser.addressUser == '' && (
                <Paper evalation={0} style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                  <Box>
                    <p>Bạn chưa có địa chỉ giao hàng? </p>
                    <p style={{ color: 'rgb(0, 127, 240)', cursor: 'pointer', paddingBottom: '5%' }} onClick={openForm}>
                      Thêm địa chỉ giao hàng mới
                    </p>
                  </Box>
                </Paper>
              )}
              {/* DIALOG EDIT */}
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <Close onClick={handleClose} style={{ marginLeft: 'auto', padding: '2%' }} />
                <DialogContent>
                  Thông tin giao hàng
                  <Box>
                    <FormAddAddress closeDialog={handleClose} user={currentUser} />
                  </Box>
                </DialogContent>
              </Dialog>
              {currentUser.addressUser !== '' && (
                <Paper evalation={0} style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                  <Box style={{ display: 'flex' }}>
                    <p>Giao tới</p>
                  </Box>
                  <Box style={{ display: 'flex', marginTop: '5%' }}>
                    <p style={{ paddingRight: '5%', color: 'rgb(56, 56, 61)', fontWeight: '600' }}>Lê Đăng Khoa</p>
                    <Box borderColor="primary.main" borderLeft={1} style={{ marginLeft: '0%' }}>
                      <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '600', paddingLeft: '15%' }}>0912246177</p>
                    </Box>
                  </Box>
                  <Box style={{ display: 'flex', marginTop: '3%' }}>
                    <p style={{ display: 'flex' }}>22/c Ấp Hưng Long, Xã Hưng Thịnh, Huyện Trảng Bom, Đồng Nai</p>
                  </Box>
                </Paper>
              )}
              {/* END ADDRESS USER */}
              <Paper evalation={0} style={{ marginTop: '5%', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%' }}>
                <Box borderColor="primary.main" borderBottom={1} style={{ paddingBottom: '15%' }}>
                  <Box style={{ display: 'flex' }}>
                    <p>Tạm tính</p>
                    <p style={{ marginLeft: '30%', color: 'black', fontWeight: '500', fontSize: '18px' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalSelected)}
                    </p>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', marginTop: '10%', paddingBottom: '10%' }}>
                  <p>Tổng cộng</p>
                  <Box style={{ marginLeft: '10%', width: '60%' }}>
                    <p style={{ marginLeft: '10%', color: 'rgb(254, 56, 52)', fontSize: '22px', fontWeight: '500' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalSelected)}
                    </p>
                    <p style={{ fontSize: '12px', marginLeft: '8%' }}>(Đã bao gồm VAT nếu có)</p>
                  </Box>
                </Box>
              </Paper>
              {/* <Link
                to={
                  !openWarning
                    ? {}
                    : {
                        pathname: '/thanks',
                        state: {
                          totalOrder: totalSelected,
                          listProductSelected: arrProductSelected,
                        },
                      }
                }
              > */}
              <Button variant="contained" className={classes.buttonmuahang} onClick={handleBuy}>
                Mua hàng
              </Button>

              {/* DIALOG IF CART NOT HAVE PRODUCT */}
              <Dialog disableEscapeKeyDown open={openWarning} onClose={handleCloseWarning}>
                <DialogContent style={{ display: 'flex' }}>
                  <InfoOutlinedIcon color="primary" />
                  <Box style={{ marginLeft: '5%' }}>Bạn vẫn chưa chọn sản phẩm nào để mua</Box>
                </DialogContent>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '40%', margin: 'auto', marginBottom: '5%' }}
                  onClick={handleCloseWarning}
                >
                  OK, đã hiểu
                </Button>
              </Dialog>
              {/* </Link> */}
            </Box>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Container>
    </Box>
  );
}

export default CartFeature;
