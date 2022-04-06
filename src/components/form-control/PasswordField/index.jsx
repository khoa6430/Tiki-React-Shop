import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';


PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled : PropTypes.bool,
};

function PasswordField(props) {
    const {form,name,label,disabled} = props;
    const {errors} = form;
    const hasError = !!errors[name];
    const [showPassword,setShowPassword] = useState(false);
    // console.log(errors[name],formState.touched[name]);

    const toggleShowPassword = () =>{
        setShowPassword(x => !x);
    }
    useEffect(()=>{
        console.log(form);
      },[]);

    return (

        <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
            name ={name}
            control = {form.control}
            as={OutlinedInput}  //UI
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword} 
                edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
            disabled={disabled}
        />
        <FormHelperText >{errors[name]?.message}</FormHelperText>
        </FormControl>

    );
}
export default PasswordField;