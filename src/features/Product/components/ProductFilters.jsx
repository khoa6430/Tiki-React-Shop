import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
// 


ProductFilter.propTypes = {
    filters:PropTypes.object.isRequired,
    onchange:PropTypes.func
};

function ProductFilter({filters,onChange}) {
    
    const handleCategoryChange = (newCategoryId) =>{
        if(!onChange) return;

        const newFilters = {
            // ... filters,    //co the xoa duoc vi o tren ListPage handleFilterChanage da co
            "_filtercategory" : newCategoryId
        };
        onChange(newFilters);
    };

    const handleChange = (values) =>{
        const newFilters = {
            // ... filters,    //co the xoa duoc vi o tren ListPage handleFilterChanage da co
            "_filterprice": {
                salePrice_gte:  parseFloat(values.salePrice_gte),
                salePrice_lte: parseFloat(values.salePrice_lte),
            },
        };
        if(onChange){
            onChange(newFilters);
        }
    }
    const handleChange2 = (value)=>{
        if(onChange){
            onChange(value);
        }
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange}/>
            <FilterByPrice onChange={handleChange}/>
            <FilterByService filters={filters} onChange={handleChange2}/>
        </Box>
    );
}

export default ProductFilter;