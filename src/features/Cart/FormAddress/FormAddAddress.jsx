import { setIn, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../firebase';
import CustomSelect from '../../Admin/AddForm/CustomSelect';
import addressApi from '../../../api/addressApi';

FormAddAddress.propTypes = {
  user: PropTypes.object,
  closeDialog: PropTypes.func,
};

function FormAddAddress(props) {
  const { closeDialog, user } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [listAddressCity, setListAddressCity] = useState([]);
  const [listAddressDistricts, setListAddressDistrict] = useState([]);
  const [listAddressWards, setListAddressWards] = useState([]);

  const [citySelect, setCitySelect] = useState('');
  const [districtSelect, setDistrictSelect] = useState('');

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      nameUser: `${user.name}`,
      phoneUser: '',
      cityUser: '',
      districtUser: '',
      wardUser: '',
      streetUser: '',
    },

    validationSchema: Yup.object({
      nameUser: Yup.string()
        .required('Bắt buộc!')
        .matches(/[a-zA-Z]/, 'Tên sản phẩm không bao gồm số và ký tự đặc biệt'),
      phoneUser: Yup.string()
        .required('Bắt buộc!')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .min(10, 'Số điện thoại phải lớn hơn 10 số')
        .max(12, 'Số điện thoại phải nhỏ hơn 12 số'),
      streetUser: Yup.string().required('Bắt buộc!'),
    }),

    onSubmit: (values) => {
      //UPDATE PRODUCT VALUE
      try {
        //set again value from form user edit
        var detailAddressUser =
          values.streetUser + ',' + values.wardUser + ',' + values.districtUser + ',' + values.cityUser;

        var addUser = {
          ...user,
          name: values.nameUser,
          addressUser: detailAddressUser,
          phoneUser: values.phoneUser,
        };

        update(ref(db, `list-user/${addUser.id}`), addUser);

        if (typeof closeDialog == 'function') {
          closeDialog();
        }

        //do some thing here on register successfully
        enqueueSnackbar(`Successful.`, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  async function getListAddress() {
    try {
      let listAddress = await addressApi.getAllAdress();
      return listAddress;
    } catch (error) {
      console.log('Failed to fetch address list', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      var _listAddress = await getListAddress();

      //Set List Wards
      for (var i = 0; i < _listAddress.length; i++) {
        //1.Find city
        if (_listAddress[i].name == citySelect) {
          _listAddress[i].districts.map((item) => {
            //2.Find district
            if (item.name == districtSelect) {
              setListAddressWards(
                item.wards.map((item2) => {
                  item2.value = item2.name;
                  item2.label = item2.name;
                  return item2;
                })
              );
            }
          });
        }
      }
      //Set List Districts
      for (var i = 0; i < _listAddress.length; i++) {
        if (_listAddress[i].name == citySelect) {
          setListAddressDistrict(
            _listAddress[i].districts.map((i) => {
              i.value = i.name;
              i.label = i.name;
              return i;
            })
          );
        }
      }
      //Set List City
      setListAddressCity(
        _listAddress.map((i) => {
          i.value = i.name;
          i.label = i.name;
          return i;
        })
      );
    }
    fetchData();
  }, [citySelect, districtSelect]);
  // console.log('xa', listAddressWards);
  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label>Họ tên</label>
        <input
          type="text"
          id="nameUser"
          name="nameUser"
          value={formik.values.nameUser}
          onChange={formik.handleChange}
          placeholder="Nhập họ tên"
        />
        {formik.errors.nameUser && <p className="errorMsg"> {formik.errors.nameUser} </p>}
        <label> Điện thoại di động</label>
        <input
          type="text"
          id="phoneUser"
          name="phoneUser"
          value={formik.values.phoneUser}
          onChange={formik.handleChange}
          placeholder="Nhập số điện thoại"
        />
        {formik.errors.phoneUser && <p className="errorMsg"> {formik.errors.phoneUser} </p>}

        <label>Tỉnh/Thành phố</label>

        {/* SELECT CITY  */}
        <CustomSelect
          className="Chọn Tỉnh/Thành phố"
          onChange={(value) => {
            // Set city current user select
            setCitySelect(value.value);
            formik.setFieldValue('cityUser', value.value);
          }}
          value={formik.values.cityUser}
          options={listAddressCity}
        />
        {/* {formik.errors.idCategoryProduct ? <div className="error">{formik.errors.idCategoryProduct}</div> : null} */}

        {/* SELECT DISTRICT  */}
        <label>Quận/Huyện</label>
        <CustomSelect
          className="Quận/Huyện"
          onChange={(value) => {
            // Set city current user select
            setDistrictSelect(value.value);
            formik.setFieldValue('districtUser', value.value);
          }}
          value={formik.values.districtUser}
          options={listAddressDistricts}
        />

        {/* SELECT WARD */}
        <label>Phường/Xã</label>
        <CustomSelect
          className="Phường/Xã"
          onChange={(value) => {
            formik.setFieldValue('wardUser', value.value);
          }}
          value={formik.values.wardUser}
          options={listAddressWards}
        />

        <label> Địa chỉ</label>
        <input
          type="text"
          id="streetUser"
          name="streetUser"
          value={formik.values.streetUser}
          onChange={formik.handleChange}
          placeholder="Ví dụ:52, đường Trần Hưng Đạo"
        />

        <button type="submit">Lưu thông tin</button>
      </form>
    </section>
  );
}

export default FormAddAddress;
