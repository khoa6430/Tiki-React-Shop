import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
// import {register} from '../../userSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import { useSnackbar } from "notistack";
Register.propTypes = {
    closeDialog : PropTypes.func
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // const handleSubmit = async (values) =>{
    //     try{
    //         //auto set username = email
    //         values.username= values.email;
    //         console.log(values);
    //         const action = register(values);
    //         const resultAction = await dispatch(action);
    //         const user = unwrapResult(resultAction);

    //         const {closeDialog} = props;
    //         if(closeDialog){
    //             closeDialog();
    //         }

    //         //do some thing here on register successfully
    //         console.log('New user',user);
    //         enqueueSnackbar(`Successful.`, { variant: "success" });
    //     }catch(error){
    //         enqueueSnackbar(error.message, { variant: "error" });
    //         console.log('Failed to register',error);
    //     }
    // };
    return (
        <div>
            {/* <RegisterForm onSubmit={handleSubmit}/> */}
        </div>
    );
}

export default Register;