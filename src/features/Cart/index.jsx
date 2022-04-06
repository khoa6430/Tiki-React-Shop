import { Box, Checkbox, Container, FormControlLabel, Grid, makeStyles, Paper, Typography,Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { DeleteOutlined } from '@material-ui/icons';
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../../firebase";
import ProductThumbnail from '../Product/components/ProductThumbnail';
import { removeFromCart,removeAllFromCart } from './cartSlice';
import { cartTotalSelector } from './selector';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
CartFeature.propTypes = {
};

const useStyle = makeStyles(theme=>({
    root:{
        marginTop:'50px'
    },
    left:{
        flex:'1 1 0',
        width:'70%',
        height:'100%'
        
    },
    right:{
    
        [theme.breakpoints.down("xs")]: {
        
          },
          [theme.breakpoints.between("sm", "md")]: {
        
          },
          "@media (min-width: 1280px)": {
            width:'350px',
            marginLeft:'10%',
          }
    },
    buttonmuahang:{
        color: theme.palette.getContrastText(red[500]),
        width:'100%',
        padding :'5%',
        marginTop:'5%',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    }
})) 



function CartFeature(props) {
    const classes = useStyle();
    const history = useHistory();
    const cartTotal = useSelector(cartTotalSelector);
    
    //var allItemCart = useSelector(state => state.cart.cartItems);

    const currentUser = useSelector((state) => state.user.current);
    var allItemCart;    
    onValue(ref(db,`list-cart/${currentUser.id}`), (snapshot) => {
         allItemCart = snapshot.val();
    });

    
    const [selected, setSelected] = useState([]);
    const [totalSelected, setTotalSelected] = useState(0);
    const dispatch = useDispatch();
 
    const handleRemoveProduct = (idProduct) =>{
        const actionRemoveProduct = removeFromCart(idProduct);
        dispatch(actionRemoveProduct);
    };
    const handleRemoveAllProduct = () =>{
        const actionRemoveAllProduct = removeAllFromCart();
        dispatch(actionRemoveAllProduct);
    };
    //CHECK BOX
       //Calculate total selected
    const sumTotalOrder = () =>{
        var totalOrder = 0;
        if(selected.length != 0){
            for(var i=0;i<allItemCart.length;i++){
                for(var j=0;j<selected.length;j++){
                    if(allItemCart[i].id == Number(selected[j])){
                        totalOrder += allItemCart[i].product.salePrice * allItemCart[i].quantity;
                    }
                }
            }
            console.log(totalOrder);
        
        }
        setTotalSelected(totalOrder);
        //return value;
   }
    useEffect(()=>{
        sumTotalOrder();
    },[selected]);


    const isAllSelected = 
    allItemCart.length > 0 && selected.length === allItemCart.length;

    const handleChange = (event) => {
        const value = event.target.value;

        if (value === "all") {
            var getproductID = [];
            allItemCart.forEach((element) => {
                getproductID.push(element.id.toString());
            });
        
            setSelected(selected.length === allItemCart.length ? [] : getproductID);

            return;
        }
        // added below code to update selected options
        const list = [...selected];
        const index = list.indexOf(value);
        index === -1 ? list.push(value) : list.splice(index, 1);
      
        setSelected(list);
 
    };
 

    var arrProductSelected = [];
    const handleBuy = ()=>{
        //get product from cart user selected from state.selected to buy 
        for(var i=0;i<allItemCart.length;i++){
            for(var j=0;j<selected.length;j++){
                if(allItemCart[i].id == Number(selected[j])){
                    arrProductSelected.push(allItemCart[i])
                    //delete product from cart
                    const actionRemoveProduct = removeFromCart(Number(selected[j]));
                    dispatch(actionRemoveProduct);
                }
            }
        }
        console.log(arrProductSelected);
    }



    return (
        
        <Box className={classes.root}>
        <Container>
            {/* <Paper evalation={0}>  */}
                <Grid container >
                    <Grid item className={classes.left}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        >
                        <Paper evalation={0} style={{display:'flex',height:'40px',width:'100%',paddingTop:'13px'}}>
                            <Box style={{marginLeft:'0px'}}>
                                    <Checkbox
                                        value='all' 
                                        checked={isAllSelected} 
                                        // indeterminate={checked[0] !== checked[1]}
                                        // indeterminate={false}
                                        onChange={handleChange} 
                                    />
                          
                            </Box>
                            <Box style={{marginLeft:'0px'}}>Tất cả (sản phẩm)</Box>
                            <Box style={{marginLeft:'310px'}}>Đơn giá</Box>
                            <Box style={{marginLeft:'70px'}}>Số lượng</Box>
                            <Box style={{marginLeft:'70px'}}>Thành tiền</Box>
                            <Box  style={{marginLeft:'20px',paddingRight:'0px',cursor:'pointer'}}
                                     onClick={() => handleRemoveAllProduct()}
                            > <DeleteOutlined/></Box>
                        </Paper>
                        <Paper evalation={0} style={{display:'block',marginTop:'3%',width:'100%'}}>
                            {allItemCart.map((x) =>(
                                <Box style={{marginLeft:'0px',display:'flex',paddingTop:'3%'}}>
                                   <Box style={{display:'flex'}}>
                                       <Box key={x.id}>
                                                <Checkbox 
                                                    value={x.id.toString()}
                                                    onChange={handleChange} 
                                                    checked={selected.includes(x.id.toString())} 
                                                />
                                       </Box>
                                       <Box style={{marginLeft:'0px',maxWidth:'150px'}}>
                                            <img src={x.product.thumbnail} alt={x.product.name} width="70%"/>
                                       </Box>
                                       <Box style={{width:'230px',marginLeft:'5px'}}>
                                            <Typography>{x.product.name}</Typography>
                                       </Box>
                                    </Box>
                                    <Box style={{marginLeft:'10px'}}>
                                        <Box style={{width:'120px',marginLeft:'5px'}}>
                                            <Typography>
                                                {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(x.product.salePrice)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{width:'50px',marginLeft:'50px'}}>
                                        <Typography>{x.quantity}</Typography>
                                    </Box>
                                    <Box style={{width:'120px',marginLeft:'50px'}}>
                                        <Typography>
                                            {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(x.quantity * x.product.salePrice)}
                                        </Typography>
                                    </Box>
                                    <Box style={{width:'20px',marginLeft:'10px',paddingRight:'0px',cursor:'pointer'}}
                                        onClick={() => handleRemoveProduct(x.id)}>
                                        <DeleteOutlined/>
                                    </Box>
                                </Box>
                                                         
                            ))} 
                    
                        </Paper>
                    </Grid>

                    
                    <Grid item className={classes.right} >
                        <Box >
                            <Paper evalation={0} style={{paddingTop:'5%',paddingLeft:'5%'}}>
                                <Box  style={{display:'flex'}}>
                                    <Typography>Giao tới</Typography>
                                </Box>
                                <Box  style={{display:'flex',marginTop:'5%',}}>
                                    <Typography style={{paddingRight:'5%',color:'rgb(56, 56, 61)',fontWeight: '600'}}>Lê Đăng Khoa</Typography>
                                    <Box 
                                        borderColor="primary.main" 
                                        borderLeft={1} 
                                        style={{marginLeft:'0%'}}
                                        >
                                        <Typography style={{color:'rgb(56, 56, 61)',fontWeight: '600',paddingLeft:'15%'}}>0912246177</Typography>
                                    </Box>
                                </Box>
                                <Box  style={{display:'flex',marginTop:'3%',}}>
                                        <Typography style={{display:'flex',}}>
                                        22/c Ấp Hưng Long, Xã Hưng Thịnh, Huyện Trảng Bom, Đồng Nai
                                        </Typography>
                                </Box>
                            </Paper>
                            <Paper evalation={0} style={{marginTop:'5%',paddingTop:'5%',paddingLeft:'5%',paddingRight:'5%'}}>
                                 <Box      borderColor="primary.main" 
                                        borderBottom={1}
                                        style={{paddingBottom:'15%'}}
                                        >
                                    <Box style={{display:'flex'}} >
                                        <Typography>Tạm tính</Typography>
                                        <Typography style={{marginLeft:'30%',color:'black',fontWeight:'500',fontSize:'18px'}}>
                                         {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format( totalSelected)}
                                           </Typography>
                                    </Box>
                                </Box> 
                                <Box style={{display:'flex',marginTop:'10%',paddingBottom:'10%'}} >
                                    <Typography>Tổng cộng</Typography>
                                    <Box style={{marginLeft:'10%',width:'60%'}}>
                                        <Typography style={{marginLeft:'10%',color: 'rgb(254, 56, 52)',fontSize: '22px',fontWeight: '500'}}>
                                        {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format( totalSelected)}</Typography>
                                        <Typography style={{fontSize:'12px',marginLeft:'8%'}}>(Đã bao gồm VAT nếu có)</Typography>
                                    </Box>
                                </Box> 
                            
                            </Paper>
                            <Link
                                to={{
                                    pathname: "/thanks",
                                    state: {
                                        totalOrder: totalSelected,
                                        listProductSelected: arrProductSelected,
                                      },
                                }}
                            >
                                <Button variant="contained" className={classes.buttonmuahang} onClick={handleBuy}>Mua hàng</Button>
                   
                            </Link>
   
                        </Box>
                    </Grid>
                </Grid>
            {/* </Paper> */}
            </Container>
            </Box>
    );
}

export default CartFeature;