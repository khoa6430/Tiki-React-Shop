import { Drawer, List, ListItemIcon, ListItemText, Badge, styled } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import { ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from '../../features/Auth/component/Login';
import Register from '../../features/Auth/component/Register';
// import { logout } from '../../features/Auth/userSlice';
import { ShoppingCart } from '@material-ui/icons';
import { cartItemsCountSelector } from '../../features/Cart/selector';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe, logout } from '../../features/Auth/userSlice';

const MODE = {
  LOGIN: 'Đăng nhập',
  REGISTER: 'Đăng ký',
};
const useStyles = makeStyles((theme) => ({
  root: {},
}));
function DrawerComp(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const currentUser = useSelector((state) => state.user.current);

  const checkLogged = Object.keys(currentUser).length;
  console.log(checkLogged);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchoEl] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        //user logs out,handle something here
        console.log('User is not logged in');
        return;
      }

      try {
        //Get me when signed in
        const action = getMe();
        const actionResult = await dispatch(action);
        const currentUser = unwrapResult(actionResult);
        console.log('Logged in user', currentUser);

        //Save user to database
        // onValue(ref(db,'list-user'), (snapshot) => {
        set(ref(db, `list-user/${currentUser.id}`), currentUser);
      } catch (error) {
        console.log('Failed to login', error.message);
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleClickOpenLogin = () => {
    setOpenDrawer(!openDrawer);
    setMode(MODE.LOGIN);
    setOpen(true);
  };
  const handleClickOpenLogout = () => {
    setOpenDrawer(!openDrawer);
    setMode(MODE.REGISTER);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    //my self
    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  const StyledBadge = styled(Badge)({
    '& .MuiBadge-badge': {
      color: 'rgb(36, 36, 36)',
      background: 'rgb(253, 216, 53)',
    },
  });
  const handleAdminClick = () => {
    history.push('/admin-dashboard');
  };
  const handleUserClick = (e) => {
    setAnchoEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchoEl(null);
  };
  const handleLogoutClick = () => {
    // const action = logout();
    // dispatch(action);
  };
  //function to logout account
  function googleSignout() {
    firebase
      .auth()
      .signOut()

      .then(
        function () {
          console.log('Signout Succesfull');
        },
        function (error) {
          console.log('Signout Failed');
        }
      );
  }
  const handleCartClick = () => {
    setOpenDrawer(!openDrawer);
    history.push('/cart');
  };
  const cartItemsCount = useSelector(cartItemsCountSelector);

  return (
    <React.Fragment>
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {checkLogged == 0 && (
          <List>
            <ListItemButton onClick={handleClickOpenLogin}>
              <ListItemIcon>
                <ListItemText>Đăng Nhập</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}
        {checkLogged != 0 && (
          <List>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText style={{ fontWeight: 'bolder', color: 'black' }}>Tài khoản</ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <ListItemText style={{ fontWeight: 'bolder', color: 'black' }}>{currentUser.name}</ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton onClick={handleCartClick}>
              <ListItemIcon>
                <ListItemText style={{ fontWeight: 'bolder', color: 'black' }}>
                  <StyledBadge badgeContent={cartItemsCount}>Giỏ hàng</StyledBadge>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleAdminClick}>
              <ListItemIcon>
                <ListItemText style={{ fontWeight: 'bolder', color: 'black' }}>Admin</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <ListItemText style={{ fontWeight: 'bolder', color: 'black' }}>Đăng xuất</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}{' '}
      </Drawer>
      <IconButton sx={{ color: 'white' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color="white" />
      </IconButton>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Close className={classes.closeButton} onClick={handleClose} />
        <DialogContent>
          {/* {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Đã có tài khoản. Đăng nhập tại đây
                </Button>
              </Box>
            </>
          )} */}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Chưa có tài khoản. Đăng ký tại đây
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DrawerComp;
