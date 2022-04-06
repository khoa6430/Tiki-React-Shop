import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography,makeStyles } from '@material-ui/core';

FilterByPrice.propTypes = {
    onChange:PropTypes.func,
};

const useStyles = makeStyles((theme)=> ({
    root:{
        borderTop : `1px solid ${theme.palette.grey[300]}`,
        padding:theme.spacing(1)
    },
    range:{
        display:'flex',
        flexFlow:'row nowrap',
        alignItems:'center',
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
        '& > span':{
            marginLeft : theme.spacing(1),
            marginRight : theme.spacing(1)
        }
    },

}));


function FilterByPrice({onChange}) {
    const [values,setValues] = useState({
        salePrice_gte:0,
        salePrice_lte:0,
    });
    const classes = useStyles();

    const add_dots = (e) =>{
        e.target.value=e.target.value.replace(/\D/g, '');
        var inputValue = e.target.value.replace('.', '').split("").reverse().join(""); // reverse
        var newValue = '';
        for (var i = 0; i < inputValue.length; i++) {
            if (i % 3 == 0) {
                newValue += '.';
            }
            newValue += inputValue[i];
        }
        e.target.value = newValue.split("").reverse().join("");
        e.target.value  = e.target.value.substring(0,e.target.value.length - 1);
         return e;
    } 


    const handleChange = (e) =>{
       
        add_dots(e);

       const {name,value} = e.target;
        setValues((prevValues)=>({
            ...prevValues,
            [name] : value,
        }));
    };

    const handleSubmit = () =>{
        if(values.salePrice_gte.length >=3 ){
            values.salePrice_gte = values.salePrice_gte.split('.').join('');
        }
        if( values.salePrice_lte.length >=3){
            values.salePrice_lte = values.salePrice_lte.split('.').join('');
        }

        if(onChange){
            onChange(values);
            setValues({
                salePrice_gte:0,
                salePrice_lte:0,
            });
        }
    };
    return (
        <Box className={classes.root}>
           <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography> 
           <Box className={classes.range}>
               <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange}/>
               <span>-</span>
               <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange}/>
           </Box>

           <Button variant="outlined" color="primary" onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;