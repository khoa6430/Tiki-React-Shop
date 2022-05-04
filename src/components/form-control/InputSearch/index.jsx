import React from 'react';
import PropTypes from 'prop-types';
import { InputBase, Paper, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import './style.scss';
import SearchIcon from '@mui/icons-material/Search';
InputSearch.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  inputsearch: {
    width: '100%',
    paddingLeft: '15px',
    height: '7vh',
    marginTop: '5px',
    // marginLeft: '10%',
    background: '#FFFFFF',
    cursor: 'pointer',
    borderRadius: '3px 3px 3px 3px',
    color: 'black',
    fontSize: '13px',
    fontWeight: 500,
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'none',
    '&:hover, &:focus': {
      // background: "#ffffff",
      borderStyle: 'none',
    },

    '&:active': {
      // background: "#ffffff",
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '100%',
    },
  },
}));

function InputSearch(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  // console.log(errors[name],formState.touched[name]);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <Controller
      name={name}
      control={form.control}
      as={InputBase} //component InputBase of Material UI
      variant="outlined"
      label={label}
      disabled={disabled}
      error={!!hasError} //chuyen ve true/false
      // placeholder={window.matchMedia('screen and (max-width: 769px)').matches ? <SearchIcon /> : 'Tìm sản phẩm'}
      placeholder="Tìm sản phẩm"
      className={classes.inputsearch}
    />
  );
}
export default InputSearch;
