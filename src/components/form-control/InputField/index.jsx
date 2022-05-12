import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, onChangeImg, valueDefault } = props;
  const { errors } = form;
  const hasError = errors[name];

  const [textInput, setTextInput] = useState('');

  // console.log(errors[name],formState.touched[name]);

  const handleTextInputChange = (event) => {
    console.log(event.target.value);
    setTextInput(event.target.value);
    // if(name == 'imgProduct'){
    onChangeImg(event.target.value);
    // }
  };

  return (
    <Controller
      name={name}
      control={form.control}
      // defaultValue={textInput}

      render={({ onChange, onBlur, value, name }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          // disabled ={disabled}
          error={!!hasError} //chuyen ve true/false
          helperText={errors[name]?.message}
          name={name}
          // value = {'123'}
          // onChange={onChange}
          value={textInput}
          onChange={handleTextInputChange}
          // onChange={(value) =>changeHandler(value)}
        />
      )}
    />
  );
}
export default InputField;
