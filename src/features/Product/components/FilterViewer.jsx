import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { setSearchEmpty } from '../../../components/Header/SearchComponent/searchSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
  
      padding: 0,
      margin: theme.spacing(2, 0),
      listStyleType: 'none',
  
      '& > li': {
        margin: 0,
        padding: theme.spacing(1),
      },
    },
  }));




FilterViewer.propTypes = {
    filters:PropTypes.object,
    onChange:PropTypes.func
};

function FilterViewer({filters={},onChange=null}) {
      const classes = useStyles();
      const dispatch = useDispatch();
      const FILTER_LIST = [

    
        {
            id: 1,
            getLabel: () => 'Giao hàng miễn phí',
            isActive: (filters) => filters._filterfreeship,
            isVisible: () => true,
            isRemovable: false,
            onRemove: () => {},
            onToggle: (filters) => {
              const newFilters = { ...filters };
              if (newFilters._filterfreeship) {
                 newFilters._filterfreeship=false;
              } else {
                newFilters._filterfreeship = true;
              }
     
              return newFilters;
       
            },
        },
        {
            id:2,
            getLabel: (filters)  => 'Có khuyến mãi',
            isActive: ()  => true,
            isVisible: (filters) => filters._filterpromotion,
            isRemovable:true,
            onRemove:(filters) =>{
    
                const newFilters = {
                  ...filters
                }
               newFilters._filterpromotion = false;
           
              return newFilters;
            },
            onToggle:() =>{},
        },
        {
            id:3,
            // getLabel: (filters) => `Từ ${filters._filterprice.salePrice_gte} đến ${filters._filterprice.salePrice_lte}`,
            getLabel: (filters) => `Từ ${new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(filters._filterprice.salePrice_gte)}
                 đến  ${new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(filters._filterprice.salePrice_lte)}`,
            isActive: ()  => true,
            isVisible: (filters) =>  
            {
              if(filters._filterprice.salePrice_gte !== 0 || filters._filterprice.salePrice_lte !== 0){
                return true;
              }
            },
            isRemovable:true,
            onRemove:(filters) =>{
              const newFilters = {...filters}
              newFilters._filterprice.salePrice_gte = 0;
              newFilters._filterprice.salePrice_lte = 0;
    
              return newFilters;
            },
            onToggle:() =>{},
        },
     
        {
            id:4,
            getLabel: (filters) => 'Kết quả tìm kiếm cho' + ' ` ' + `${filters._filtersearch}` + ' ` ',
            isActive: (filters)  => true,
            isVisible: (filters) =>{
              if(filters._filtersearch !== ''){
                return true;
              }
            },  
            isRemovable:true,
            onRemove:(filters) =>{
              const newFilters = {...filters}
              newFilters._filtersearch = '';
              //reset in store
              const actionResetSearch = setSearchEmpty();
              dispatch(actionResetSearch);
              return newFilters;
            },
            onToggle:() =>{},
        },
    ]
    //chi render lai khi filter thay doi
    const visibleFilters = useMemo(()=>{
      return FILTER_LIST.filter((x)=>x.isVisible(filters));
    },[filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map( (x)=>(
                <li key={x.id}>
                    <Chip 
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={
                            x.isRemovable
                              ? null
                              : () => {
                                  if (!onChange) return;
                                  
                                  const newFilters = x.onToggle(filters);
                                  onChange(newFilters);
                                }
                          }
                        onDelete={x.isRemovable ? ()=> {
                          if (!onChange) return;
                                  
                          const newFilters = x.onRemove(filters);
                          onChange(newFilters);
                        } : null }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;