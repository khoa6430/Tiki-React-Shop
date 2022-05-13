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
RegisterForm.protoType = {
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
var getEmailUser;
onValue(ref(db, '/list-user'), (snapshot) => {
  //do firebase
  const data = snapshot.val();
  var arr = [];
  if (data !== null) {
    Object.values(data).map((todo) => {
      arr.push(todo);
    });
  }
});
function RegisterForm(props) {
  const classes = useStyles();
  const [listEmail, setListEmail] = useState([]);
  useEffect(() => {
    var getdata = [];
    async function getUserCurent() {
      await onValue(
        ref(db, `/list-user`),
        (snapshot) => {
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map((item) => {
              getdata.push(item);
            });
            setListEmail(getdata);
          }
        },
        {
          onlyOnce: true,
        }
      );
    }
    getUserCurent();
  }, []);

  const NAME_REGEX =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
  const TOO_SMALL_ERROR_MESSAGE = 'Vui lòng nhập họ tên ít nhất 3 ký tự';
  const INVALID_FORMAT_ERROR_MESSAGE = 'Họ tên chỉ có thể là ký tự';

  // Valid Name
  function isValidName() {
    return this.min(3, TOO_SMALL_ERROR_MESSAGE).matches(NAME_REGEX, {
      message: INVALID_FORMAT_ERROR_MESSAGE,
      excludeEmptyStrings: true,
    });
  }

  // Valid Email
  function isValidEmail(message) {
    return this.test('isValidEmail', message, function (value) {
      const { path, createError } = this;
      var checkExist = -1;
      listEmail.map((x) => {
        if (x.email === value) {
          checkExist = 1;
        } else {
          checkExist = 0;
        }
      });
      if (checkExist == 1) {
        return createError({ path, message: message ?? 'Email đã được đăng ký.Vui lòng thử email khác!' });
      }

      return true;
    });
  }
  yup.addMethod(yup.string, 'isValidName', isValidName);
  yup.addMethod(yup.string, 'isValidEmail', isValidEmail);

  const schema = yup.object({
    fullName: yup.string().required('Vui lòng nhập họ tên của bạn').isValidName(),
    email: yup.string().isValidEmail().required('Vui lòng nhập email của bạn').email('Vui lòng nhập email hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn').min(6, 'Mật khẩu phải tổi thiểu 6 ký tự'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu của bạn')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      //have wait onSubmit(get api) to done
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
        Tạo tài khoản
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined">
        <InputField name="fullName" label="Họ và Tên" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
}
export default RegisterForm;
