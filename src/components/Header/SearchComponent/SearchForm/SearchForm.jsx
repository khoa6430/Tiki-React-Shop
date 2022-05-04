import React from 'react';
import PropTypes from 'prop-types';
import InputSearch from '../../../../components/form-control/InputSearch';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import LockOutline from '@material-ui/icons/LockOutlined';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import logosearch from '../../../../img/searchicon.png';

import './stylesearch.scss';
SearchForm.protoType = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  submit: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'none',
    },
    '@media (min-width: 1280px)': {
      width: '18%',
    },
  },
  logosearch: {
    width: '20px',
    height: '20px',
    marginLeft: '-5px',
  },
}));

function SearchForm(props) {
  const classes = useStyles();
  const schema = yup.object({
    searchinput: yup.string(),
    // .required('Please enter your email')
    // .email('Please enter a valid email address'),
    // password: yup.string().required('Please enter your password')
    // .min(6,'Please enter at least 6 character'),
  });
  const form = useForm({
    defaultValues: {
      searchinput: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      //have wait onSubmit(get api) to done
      await onSubmit(values);
    }
    form.reset();
  };
  const { isSubmitting } = form.formState;
  return (
    <div className="rootsearch">
      <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined" className="frameform">
        <InputSearch name="searchinput" label="Tìm Kiếm" form={form} className="searchform" />
        <Button disabled={isSubmitting} type="submit" className="btsubmitsearch" variant="contained">
          <img src={logosearch} alt="logosearch" className="logosearch" />
          <Typography style={{ fontSize: '13px', marginLeft: '10px', marginTop: '1px' }}>Tìm kiếm</Typography>
        </Button>
      </form>
    </div>
  );
}
export default SearchForm;
