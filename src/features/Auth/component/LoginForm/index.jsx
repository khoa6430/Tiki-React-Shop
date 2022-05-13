import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-control/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import LockOutline from '@material-ui/icons/LockOutlined';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import PasswordField from '../../../../components/form-control/PasswordField';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../firebase';
LoginForm.protoType = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const [listUser, setlistUser] = useState([]);
  const [idUser, setIdUser] = useState();
  useEffect(() => {
    var getdata = [];
    async function setListData() {
      await onValue(
        ref(db, `/list-user`),
        (snapshot) => {
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map((item) => {
              getdata.push(item);
            });
            setlistUser(getdata);
          }
        },
        {
          onlyOnce: true,
        }
      );
    }
    setListData();
  }, []);

  function checkEmail(emailUserLogin) {
    var check = 0;
    listUser.map((item) => {
      if (item.email === emailUserLogin) {
        check = 1;
      }
    });
    if (check == 1) {
      return 1;
    } else if (check == 0) {
      return 0;
    }
  }
  function checkPass(passlUserLogin, emailUserLogin) {
    var check = 0;
    listUser.map((item) => {
      if (item.email === emailUserLogin) {
        if (item.password === passlUserLogin) {
          check = 1;
        }
      }
    });
    if (check == 1) {
      return 1;
    } else if (check == 0) {
      return 0;
    }
  }

  // Valid Email
  function isValidEmail(message) {
    return this.test('isValidEmail', message, async function (value) {
      const { path, createError } = this;
      var checkLogin = await checkEmail(value);
      if (checkLogin === 0) {
        return createError({ path, message: message ?? 'Email bạn đã nhập không chính xác' });
      }

      return true;
    });
  }
  // Valid Password
  function isValidPass(message) {
    return this.test('isValidPass', 'Mật khẩu bạn đã nhập không chính xác', async function (value) {
      const { path, createError } = this;
      var checkLogin = await checkPass(value);
      if (checkLogin === 0) {
        return createError({ path, message: message ?? 'Email bạn đã nhập không chính xác' });
      }
      return true;
    });
  }

  yup.addMethod(yup.string, 'isValidEmail', isValidEmail);
  yup.addMethod(yup.string, 'isValidPass', isValidPass);
  const schema = yup.object({
    email: yup.string().isValidEmail().required('Vui lòng nhập email của bạn').email('Vui lòng nhập email hợp lệ'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 character')
      // .isValidPass(),
      .test('test-compare a few values', 'Mật khẩu bạn đã nhập không chính xác', async function (value) {
        // beware, don't use arrow function here otherwise you would not the reference to `this` object
        let value1 = await checkPass(value, this.parent['email']);
        // let value1 = this.parent['email'];
        if (value1 === 0) return false; // false sẽ in ra lỗi
        else return true;
      }),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      //have wait onSubmit(get api) to done
      console.log(values);
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress />}
      <Avatar className={classes.avatar}>
        <LockOutline></LockOutline>
      </Avatar>
      <Typography className={classes.title} component="h3" varient="h5">
        Đăng nhập
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined">
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
export default LoginForm;
