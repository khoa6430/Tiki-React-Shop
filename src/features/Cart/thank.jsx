import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, Container, FormControlLabel, Grid, makeStyles, Paper, Typography,Button } from '@material-ui/core';
import { fontSize } from '@mui/system';

ThanksYouFeature.propTypes = {
    
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
       
    },
   
})) 

function ThanksYouFeature(props) {
    const classes = useStyle();
    var listProduct = props.history.location.state.listProductSelected;
    var totalOrder = props.history.location.state.totalOrder;




    return (
        <Box className={classes.root}>
            <Container>
                <Grid container >
                    <Paper style={{width:'100%'}}>
                        <Box>
                            <Typography style={{fontSize:'55px',color:'red',fontWeight:'600'}}>Cảm ơn bạn!</Typography>
                            <Typography style={{fontSize:'35px'}}>Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất</Typography>
                            <Typography style={{fontSize:'25px'}}>Bạn vui lòng chuẩn bị số tiền {' '}
                                <span style={{color:'red',fontSize:'35px',fontWeight:'600'}}>{new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format( totalOrder)} </span>
                           </Typography>
                        </Box>
                        <Box>
                            <Box style={{background:'#DCDCDC',display:'flex',paddingLeft:'20%',paddingTop:'1%',marginTop:'20px',paddingBottom:'1%'}}>
                                <Typography style={{fontSize:'20px'}}>Chi tiết đơn hàng</Typography>
                            </Box>
                            {listProduct.map((x) =>(
                                <Box key = {x.id} style={{display:'flex',paddingLeft:'16%',paddingTop:'1%',marginTop:'20px',width:'100%',paddingBottom:'2%'}}>
                                    <Box style={{width:'250px'}}>
                                        <Typography style={{fontSize:'20px'}}>{x.product.name}</Typography>
                                    </Box>
                                    <Box style={{marginLeft:'12%'}}>
                                        <Typography style={{fontSize:'20px',marginLeft:'0%'}}>Số lượng : {x.quantity}</Typography>
                                    </Box>
                                    <Box style={{marginLeft:'12%'}}>
                                        <Typography style={{fontSize:'20px',marginLeft:'0%'}}>
                                            Tổng tiền : {' '}
                                            {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(x.product.salePrice * x.quantity)}
                                        </Typography>
                                    </Box>
                              
                                </Box>
                            ))} 
                        
                        </Box>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}

export default ThanksYouFeature;