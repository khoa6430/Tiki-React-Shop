import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import {login, register} from '../../userSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import { useSnackbar } from "notistack";
import LoginForm from '../LoginForm';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
Login.propTypes = {
    closeDialog : PropTypes.func
};

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl : '/products',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
   
  };

function Login(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) =>{
        try{
            //auto set username = email
            // values.username= values.email;

            // const action = login(values);
            // const resultAction = await dispatch(action);
            // const user = unwrapResult(resultAction);

            // const {closeDialog} = props;
            // if(closeDialog){
            //     closeDialog();
            // }


            //do some thing here on register successfully
            // console.log('New user',user);
            enqueueSnackbar(`Login Successful.`, { variant: "success" });
        }catch(error){
            enqueueSnackbar(error.message, { variant: "error" });
            console.log('Failed to login',error);
        }
    };
    return (
        <div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {/* <LoginForm onSubmit={handleSubmit}/> */}
        </div>
    );
}

export default Login;