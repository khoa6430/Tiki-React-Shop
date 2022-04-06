import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-control/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import LockOutline from '@material-ui/icons/LockOutlined';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'; 
import PasswordField from '../../../../components/form-control/PasswordField';

LoginForm.protoType={
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

function LoginForm(props) {
    const classes = useStyles();
    const schema = yup.object({
        identifier: yup.string()
        .required('Please enter your email')
        .email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password')
        .min(6,'Please enter at least 6 character'),
    });
    const form = useForm({
        defaultValues:{
            identifier:'',
            password:'',
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
    console.log(isSubmitting);
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress/>}
            <Avatar className={classes.avatar}>
                <LockOutline></LockOutline>
            </Avatar>
            <Typography className={classes.title} component="h3" varient="h5">
                Đăng nhập
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined">
                <InputField name="identifier" label="Email" form={form}/>
                <PasswordField name="password" label="Mật khẩu" form={form}/>
                <Button disabled={isSubmitting} type ="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}
export default LoginForm;























