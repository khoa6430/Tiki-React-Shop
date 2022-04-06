import { Badge, Menu, MenuItem, styled, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingCart } from "@material-ui/icons";
import Close from '@material-ui/icons/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import logoarrowndown from '../../../src/img/logoarrowdown.png';
import logofreeship from '../../../src/img/logofreeship.png';
import logoheader from '../../../src/img/logoheader.png';
import logouser from '../../../src/img/logouser.png';
import Login from '../../features/Auth/component/Login';
import Register from '../../features/Auth/component/Register';
// import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selector';
import SearchControl from '../Header/SearchComponent/SearchControl/SearchControl';
import { setSearchValue } from '../Header/SearchComponent/searchSlice';
import DrawerComp from './Drawer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getMe, logout } from '../../features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase";

const useStyles = makeStyles((theme)=>({
    root: {
      flexGrow : 1
    },
    framelogo:{
    
      marginLeft:'10%',
      marginBottom:'10px',
      [theme.breakpoints.down("xs")]: {
        marginLeft:'auto',
      },
      [theme.breakpoints.between("sm", "md")]: {
        marginLeft:'auto',
      },
      "@media (min-width: 1280px)": {
    
      }
    },
    imglogo:{
      width:'60px',
      height:'40px',
      [theme.breakpoints.down("xs")]: {
        width:'60px',
        height:'40px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        width:'60px',
        height:'40px',
      },
      "@media (min-width: 1280px)": {
    
      }
    },
    imglogofreeship:{
      marginTop:'10%',
      width:'87px',
      height:'12px',
      [theme.breakpoints.down("xs")]: {
        display:'none',
      },
      [theme.breakpoints.between("sm", "md")]: {
        display:'none',
      },
      "@media (min-width: 1280px)": {
    
      }
    },
    menuButton : {
        marginRight : theme.spacing(2),
        backgroundColor: "#21b6ae",
    },
    title : {
        flexGrow : 1
    },
    link:{
      display: 'flex',
      flexDirection:'column',
        color:"#fff",
        textDecoration:'none'
    },
    closeButton:{
      position:'absolute',
      top : theme.spacing(1),
      right : theme.spacing(1),
      color:theme.palette.grey[500],
      zIndex:1,
      "&:hover": {
        color: 'red',
        cursor : 'pointer'
      }
     },
    boxProposeSearch:{
      
        display: 'flex',
        flexFlow: 'row wrap',
        // alignItems: 'center',
        width:'40%',
        marginLeft: '10%',
        marginBottom:'10px',
        listStyleType: 'none',

        '& > li': {
          marginLeft:'20px',
          cursor:'pointer',
   
        },
        [theme.breakpoints.down("xs")]: {
          width:'50%',
         
        },
        [theme.breakpoints.between("sm", "md")]: {
            width:'50%',
      
        },
        "@media (min-width: 1280px)": {
      
        }
     },
    framelogin:{
      display:'flex'
    },
    logouser:{
      width:'32px',
      height:'32px',
      marginRight:'15px',
      marginTop:'10px'
    }
}));

const MODE = {
  LOGIN:'Đăng nhập',
  REGISTER : 'Đăng ký'
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
    const [mode,setMode] = useState(MODE.LOGIN);
    const [anchorEl,setAnchoEl] = useState(null);

  


    //function to logout account
    function googleSignout() {
      firebase.auth().signOut()
     
      .then(function() {
         console.log('Signout Succesfull')
      }, function(error) {
         console.log('Signout Failed')  
      });
   }


    const handleClickOpen = () => {
        setOpen(true);
    };

    //RESPONSIVE
    const theme = useTheme();
    // console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    // console.log(isMatch);

    //END RESPONSIVE 

    useEffect(()=>{
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {

        console.log(user);
        if(!user){
          //user logs out,handle something here
          console.log('User is not logged in');
          return;
        }

        try{
          //Get me when signed in
          const action = getMe();
          const actionResult = await dispatch(action);
          const currentUser = unwrapResult(actionResult);
          console.log('Logged in user',currentUser);

          //Save to local
          onValue(ref(db,'list-user'), (snapshot) => {
              const data = snapshot.val();
              set(ref(db, `list-user/${currentUser.id}` ),currentUser);
            
          });
          
        }catch(error){
          console.log('Failed to login',error.message);
        }
        // console.log('Logged in user : ', user.displayName);
        // const token = await user.getIdToken();
        // console.log('Logged in user token: ', token);

      });

      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    },[]);

    const handleClose = (event, reason) => {
        //my self
        if (reason && reason == "backdropClick") 
        return;
        setOpen(false);
    };
    const StyledBadge = styled(Badge)({
      "& .MuiBadge-badge": {
        color: 'rgb(36, 36, 36)',
        background: 'rgb(253, 216, 53)',
      }
    });
    const handleUserClick = (e)=>{
      setAnchoEl(e.currentTarget);
    }

    const handleCloseMenu = () =>{
      setAnchoEl(null);
    }
    const handleLogoutClick = () =>{
        setAnchoEl(null);
        const action = logout();
        dispatch(action);
        // indexedDB.deleteDatabase('firebaseLocalStorageDb');
        // logoutFirebase();
        googleSignout();
    }


    const handleCartClick = () => {
      history.push('/cart');
    };

    const LIST_PROPOSESEARCH = [
      {
        id:1,
        valueSearch:'Mac',
      },
      {
        id:2,
        valueSearch:'ao',
      },
      {
        id:3,
        valueSearch:'iphone',
      },
      {
        id:4,
        valueSearch:'SSD',
      }

    ];
    
    var handleProposeSearch = (values)=>{
      console.log(values);
      const actionSearchValue = setSearchValue(values);
      dispatch(actionSearchValue);
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "rgb(26, 148, 255)",paddingTop:"5px"}}>
        {/* TEST RESPONSIVE */}
        {/* <Toolbar>
            <Typography>SHOP </Typography>
        </Toolbar> */}
   
        {/*END TEST RESPONSIVE */}

 
         <Toolbar >
          <Box className={classes.framelogo}>

                <Link to="/products" className={classes.link}> 
                  <img src={logoheader} alt="logoheader" className={classes.imglogo}/>
                  <img src={logofreeship} alt="logoheader" className={classes.imglogofreeship}/>
              </Link> 
          </Box>
   
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <Box>
              <SearchControl />
              <Box className={classes.boxProposeSearch}>
                  {LIST_PROPOSESEARCH.map( (x)=>(
                      <li key={x.id}>
                            <Typography style={{fontSize:'10px'}} onClick={() => handleProposeSearch(x.valueSearch)}>{x.valueSearch}
                            </Typography>
                      </li>
                  ))}
                </Box>
            </Box>
      
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <Box style={{display:'flex',marginTop:'-10px'}}>

                  {/* LOGIN  */}

                <img src={logouser} alt="logouser" className={classes.logouser}/>
                {/* <img src={currentUser.photoUrl} alt="logouser" style={{width:'16px',height:'16px'}}/> */}

 
                {checkLogged == 0 && (
                  <Button  color="inherit" onClick={handleClickOpen}>Đăng nhập/Đăng ký</Button>
                )}

                {checkLogged != 0 && (
                  <IconButton  onClick={handleUserClick}
                        disableRipple
                        size="small"
                        sx={{
                          ml: 1,
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                    style={{display:'flex',flexDirection:'column',color:'white',justifyContent: 'flex-start'}}>
                      <Typography>
                        Tài khoản
                   
                      </Typography>
                      <Typography>
                      {currentUser.name}
                    
                      </Typography>
                  </IconButton>
                )} 

                {/* END LOGIN  */}

                {/* CART ICON */}

                <IconButton disableRipple
                  size="large"
                  sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                  }} aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                    <StyledBadge badgeContent={cartItemsCount}>
                    <ShoppingCart style={{ fontSize: 32 }} />
                  </StyledBadge>
                  <Typography style={{marginTop:'10px',marginRight:'100px'}}>Giỏ hàng</Typography>

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
        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
      </Menu>      

       <Dialog disableEscapeKeyDown  open={open} onClose={handleClose}>
          <Close  className={classes.closeButton} onClick={handleClose}/>
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
              <Login closeDialog={handleClose}/>
              <Box textAlign='center'>
                <Button color='primary' onClick={()=>setMode(MODE.REGISTER)}>
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
