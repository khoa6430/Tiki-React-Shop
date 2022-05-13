import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

import { useDispatch } from 'react-redux';
// import {register} from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleSubmit = async (values) => {
    try {
      //auto set username = email

      var addUser = {
        id: `${makeid(20)}`,
        addressUser: '',
        name: values.fullName,
        email: values.email,
        password: values.password,
        photoUrl: '',
        phoneNumber: '',
      };

      console.log(addUser);

      set(ref(db, `list-user/${addUser.id}`), addUser);

      const { closeDialog } = props;
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
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
