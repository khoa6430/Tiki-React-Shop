import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography,makeStyles, FormControlLabel, Checkbox } from '@material-ui/core';

import { LocalOfferOutlined as LocalOfferOutlinedIcon } from "@material-ui/icons";

import logofreeship from '../../../../img/freeship.png';
import './styles.scss';

FilterByService.propTypes = {
    filters : PropTypes.object,
    onChange:PropTypes.func,
};

const useStyles = makeStyles((theme)=> ({
    root:{
        borderTop : `1px solid ${theme.palette.grey[300]}`,
        padding:theme.spacing(1)
    },
    list:{
        padding:0,
        listStyleType:'none',
        justifyContent:'flex-start',
        '& > li':{
            
            // marginTop:theme.spacing(1),
        }
    },

}));


function FilterByService({filters = {},onChange}) {
    const classes = useStyles();

    const handleChange = (e) =>{
        if(!onChange) return;
        var {name,checked} = e.target;
        onChange({[name]:checked});
    };
    return (
        <Box className={classes.root}>
           <Typography variant='subtitle2'>DỊCH VỤ</Typography> 
           
           <ul className={classes.list}>
               {[{value:'_filterpromotion',label:'Có khuyến mãi'},
                {value:'_filterfreeship',label:'Không giới hạn'}].map((service) => (
                   <li key={service.value}   className= {`${service.value}` === '_filterpromotion' ? 'promotionbox' : ''} >
                       <FormControlLabel 
       
                            control={
                                <Checkbox
                                checked={filters[service.value]}    // filters._filterpromotion
                                onChange={handleChange} name={service.value} color="primary" className='cbox'/>
                             }
                            label= {
                                service.value == '_filterpromotion' ? 
                                <Box className='boxlogo1'>
                                    <LocalOfferOutlinedIcon className='localicon' style={{ color: "red" }}/>
                                    <span className='labellogo'>
                                        <p>{service.label}</p>
                                    </span>
                                </Box>
                                : <Box className='boxlogo'>
                                    <img src={logofreeship} alt="freeship" width='76px' height='24px' className='imglogo'/>
                                    <span className='labellogo'>
                                        <p>{service.label}</p>
                                    </span>
                                </Box>
                            }
                            />
                   </li>
               ))}
              {/* <img src='https://salt.tikicdn.com/ts/upload/af/84/fc/2037c3b93a81767aed21358ebf3f8b8e.png' alt="freeship" /> */}
           </ul>
        </Box>
    );
}

export default FilterByService;