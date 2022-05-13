import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getMe2, logout } from '../../userSlice';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../firebase';
Login.propTypes = {
  closeDialog: PropTypes.func,
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      // values.username= values.email;

      // const action = login(values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      var userLogin;
      async function setListData() {
        await onValue(
          ref(db, `/list-user`),
          (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
              Object.values(data).map((item) => {
                if (item.email === values.email) {
                  userLogin = item;
                }
              });
            }
          },
          {
            onlyOnce: true,
          }
        );
      }
      setListData();
      console.log(userLogin);

      //Get me when signed in
      const action = getMe2(userLogin);
      const actionResult = await dispatch(action);
      var currentUser = unwrapResult(actionResult);
      console.log('cr', currentUser);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      //do some thing here on register successfully
      // console.log('New user',user);
      enqueueSnackbar(`Login Successful.`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('Failed to login', error);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Login;
