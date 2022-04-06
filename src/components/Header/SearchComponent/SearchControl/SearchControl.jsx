import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import { useSnackbar } from "notistack";
import {showSearchValue,setSearchValue, setSearchEmpty} from '../searchSlice';
import SearchForm from '../SearchForm/SearchForm';
SearchControl.propTypes = {
    // onSubmit : PropTypes.func
};

function SearchControl(props) {
    // const {onSubmit} = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const handleSubmit =  (values) =>{
            const actionSearchValue = setSearchValue(values.searchinput);
            dispatch(actionSearchValue);

    };
    return (
        <div>
            <SearchForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default SearchControl;