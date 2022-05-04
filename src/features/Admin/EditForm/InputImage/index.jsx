import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputImage.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled : PropTypes.bool,
};

function InputImage(props) {
    const {form,name,label,disabled} = props;
    const {errors} = form;
    const hasError = errors[name];
    // console.log(errors[name],formState.touched[name]);
    return (
        <Controller
            name ={name}
            control = {form.control}
            // as={TextField}  //UI
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            disabled ={disabled}
            error={!!hasError} //chuyen ve true/false
            helperText={errors[name]?.message}
            render={(props) => {
                return (
                  <input
                    type="file"
                    name="files"
                    multiple
                    {...props}
                    value={props.value.filename}
                    onChange={(event) => {
                      return props.onChange(event.target.files);
                    }}
                  />
                );
            }}
        />
        
    );
}
export default InputImage;