import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import {register} from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import EditForm from './EditForm';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../firebase';

Edit.propTypes = {
  product: PropTypes.object,
  closeDialog: PropTypes.func,
};

function Edit(props) {
  const { closeDialog, product } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      //set again value from form user edit

      var updateProduct = {
        ...product,
        name: values.fullName,
        salePrice: values.priceProduct,
        thumbnail: values.imgProduct,
      };

      update(ref(db, `list-product/${product.id}`), updateProduct);

      if (closeDialog) {
        closeDialog();
      }

      //do some thing here on register successfully
      enqueueSnackbar(`Successful.`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('Failed to register', error);
    }
  };
  return (
    <div>
      <EditForm onSubmit={handleSubmit} product={product} />
    </div>
  );
}

export default Edit;
