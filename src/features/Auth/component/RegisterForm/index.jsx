import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-control/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import LockOutline from '@material-ui/icons/LockOutlined';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'; 
import PasswordField from '../../../../components/form-control/PasswordField';

RegisterForm.protoType={
    onSubmit:PropTypes.func,
}

const useStyles = makeStyles(theme=> ({
    root:{
        paddingTop: theme.spacing(4),
    },
    avatar:{
       margin : '0 auto',
       backgroundColor : theme.palette.secondary.main,
    },
    title:{
        margin : theme.spacing(2,0,3,0),
        textAlign:'center'
    },
    submit:{
        margin : theme.spacing(3,0,2,0),
    }
}));

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object({
        fullName : yup.string()
        .required('Please enter your full name')
        .test('should has at least two words','Please enter at least two words.',(value) =>{
            value.trim()
            return value.split(' ').length >=2;
        }),
        email: yup.string()
        .required('Please enter your email')
        .email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password')
        .min(6,'Please enter at least 6 character'),
        retypePassword : yup.string().required('Please retype your password.')
        .oneOf([yup.ref('password')],'Password does not match'), 
    });
    const form = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:'',
            retypePassword:''
        },
        resolver:yupResolver(schema),
    });
    const handleSubmit = async (values)=>{
        const {onSubmit}=props;
        if(onSubmit){
            //have wait onSubmit(get api) to done
            await onSubmit(values);
        }
        // form.reset();
    }

    const {isSubmitting} = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress/>}
            <Avatar className={classes.avatar}>
                <LockOutline></LockOutline>
            </Avatar>
            <Typography className={classes.title} component="h3" varient="h5">
                Tạo tài khoản
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined">
                <InputField name="fullName" label="Họ và Tên" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <PasswordField name="password" label="Mật khẩu" form={form}/>
                <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form}/>
                <Button disable={isSubmitting} type ="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                    Tạo tài khoản
                </Button>
            </form>
        </div>
        

    );
}
export default RegisterForm;