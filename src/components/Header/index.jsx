import { Badge, Menu, MenuItem, styled, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingCart } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ref, set } from 'firebase/database';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import logofreeship from '../../../src/img/logofreeship.png';
import logoheader from '../../../src/img/logoheader.png';
import logouser from '../../../src/img/logouser.png';
import Login from '../../features/Auth/component/Login';
import { getMe, logout } from '../../features/Auth/userSlice';
// import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selector';
import { db } from '../../firebase';
import SearchControl from '../Header/SearchComponent/SearchControl/SearchControl';
import { setSearchValue } from '../Header/SearchComponent/searchSlice';
import DrawerComp from './Drawer';
import './style.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // framelogo: {
  //   marginLeft: '10%',
  //   marginBottom: '10px',
  //   [theme.breakpoints.down('xs')]: {
  //     marginLeft: 'auto',
  //   },
  //   [theme.breakpoints.between('sm', 'md')]: {
  //     marginLeft: 'auto',
  //   },
  //   '@media (min-width: 1280px)': {},
  // },
  // imglogo: {
  //   width: '60px',
  //   height: '40px',
  //   [theme.breakpoints.down('xs')]: {
  //     width: '60px',
  //     height: '40px',
  //   },
  //   [theme.breakpoints.between('sm', 'md')]: {
  //     width: '60px',
  //     height: '40px',
  //   },
  //   '@media (min-width: 1280px)': {},
  // },
  // imglogofreeship: {
  //   marginTop: '10%',
  //   width: '87px',
  //   height: '12px',
  //   [theme.breakpoints.down('xs')]: {
  //     display: 'none',
  //   },
  //   [theme.breakpoints.between('sm', 'md')]: {
  //     display: 'none',
  //   },
  //   '@media (min-width: 1280px)': {},
  // },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#21b6ae',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
    '&:hover': {
      color: 'red',
      cursor: 'pointer',
    },
  },
  boxProposeSearch: {
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '50%',
    },
    '@media (min-width: 1280px)': {},
  },
  framelogin: {
    display: 'flex',
  },
}));

const MODE = {
  LOGIN: 'Đăng nhập',
  REGISTER: 'Đăng ký',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const currentUser =

  const currentUser = useSelector((state) => state.user.current);
  const checkLogged = Object.keys(currentUser).length;

  const history = useHistory();
  const cartItemsCount = useSelector(cartItemsCountSelector);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchoEl] = useState(null);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  //RESPONSIVE
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  //END RESPONSIVE

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
        // },{
        //     onlyOnce: true
        // });
      } catch (error) {
        console.log('Failed to login', error.message);
      }
      // console.log('Logged in user : ', user.displayName);
      // const token = await user.getIdToken();
      // console.log('Logged in user token: ', token);
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

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
  const handleUserClick = (e) => {
    setAnchoEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchoEl(null);
  };
  const handleLogoutClick = () => {
    setAnchoEl(null);
    const action = logout();
    dispatch(action);

    googleSignout();
  };

  const handleCartClick = () => {
    history.push('/cart');
  };
  const handleAdminClick = () => {
    history.push('/admin-dashboard');
  };
  const LIST_PROPOSESEARCH = [
    {
      id: 1,
      valueSearch: 'Mac',
    },
    {
      id: 2,
      valueSearch: 'ao',
    },
    {
      id: 3,
      valueSearch: 'iphone',
    },
    {
      id: 4,
      valueSearch: 'SSD',
    },
  ];

  var handleProposeSearch = (values) => {
    const actionSearchValue = setSearchValue(values);
    dispatch(actionSearchValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'rgb(26, 148, 255)' }}>
        {/* LOGO FREE SHIP */}
        <Toolbar className="frameheader">
          <Box className="framelogo">
            <Link to="/products" className="linklogo">
              <img src={logoheader} alt="logoheader" className="imglogo" />
              <img src={logofreeship} alt="logoheader" className="imglogofreeship" />
            </Link>
          </Box>
          {/* SEARCH */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ height: '12vh', marginTop: '12px' }}>
            <Box>
              <SearchControl />
              {/* Search proposesearch */}
              <Box className="boxProposeSearch">
                {LIST_PROPOSESEARCH.map((x) => (
                  <li key={x.id}>
                    <Typography style={{ fontSize: '10px' }} onClick={() => handleProposeSearch(x.valueSearch)}>
                      {x.valueSearch}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          </Typography>
          {/* LOGIN  */}
          {isMatch ? (
            <Box className="drawerframe">
              <DrawerComp />
            </Box>
          ) : (
            // REPONSIVE >= PC
            <Box style={{ display: 'flex' }}>
              {/* LOGIN  */}

              <img src={logouser} alt="logouser" className="logouser" />

              {/* USER HAVEN'T LOGIN */}
              {checkLogged == 0 && (
                <Box>
                  <Button color="inherit" onClick={handleClickOpen} className="boxbuttondk">
                    <Typography variant="caption"> Đăng nhập/Đăng ký</Typography>
                    <Typography variant="caption" style={{ display: 'flex', float: 'left' }}>
                      Tài khoản
                      <div style={{ display: 'absolute', marginTop: '-4%' }}>
                        <ArrowDropDownIcon />
                      </div>
                    </Typography>
                  </Button>
                </Box>
              )}
              {/* USER HAD LOGIN  */}

              {checkLogged != 0 && (
                <Box>
                  <Button color="inherit" onClick={handleUserClick} className="boxbuttondk">
                    <Typography variant="caption"> Tài khoản</Typography>
                    <Typography variant="caption" style={{ display: 'flex' }}>
                      {currentUser.name}
                      <div style={{ display: 'absolute', marginTop: '-4%' }}>
                        <ArrowDropDownIcon />
                      </div>
                    </Typography>
                  </Button>
                </Box>
              )}
              {/* END LOGIN  */}

              {/* CART ICON */}

              <IconButton
                disableRipple
                size="large"
                sx={{
                  ml: 1,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleCartClick}
                className="frameiconcart"
              >
                <StyledBadge badgeContent={cartItemsCount}>
                  <ShoppingCart style={{ fontSize: 32 }} />
                </StyledBadge>
                <Typography variant="body2" className="contentcart">
                  Giỏ hàng
                </Typography>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
        <MenuItem onClick={handleAdminClick}>Admin</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Close className={classes.closeButton} onClick={handleClose} />
        <DialogContent>
          {/* {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}/>
              <Box textAlign='center'>
                <Button color='primary' onClick={()=>setMode(MODE.LOGIN)}>
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
    </Box>
  );
}
