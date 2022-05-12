import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import './Edit.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../firebase';

EditComponent.propTypes = {
  row: PropTypes.object,
  closeDialog: PropTypes.func,
};

function EditComponent(props) {
  const { closeDialog, row } = props;
  const { enqueueSnackbar } = useSnackbar();

  const add_dots = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    var inputValue = e.target.value.replace('.', '').split('').reverse().join(''); // reverse
    var newValue = '';
    for (var i = 0; i < inputValue.length; i++) {
      if (i % 3 == 0) {
        newValue += '.';
      }
      newValue += inputValue[i];
    }
    e.target.value = newValue.split('').reverse().join('');
    e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    return e;
  };

  const formik = useFormik({
    initialValues: {
      idProduct: `${row.product.id}`,
      nameProduct: `${row.product.name}`,
      priceProduct: `${row.product.salePrice}`,
      percentPromotion: `${row.product.promotionPercent}`,
      imgProduct: `${row.product.thumbnail}`,
    },
    validationSchema: Yup.object({
      nameProduct: Yup.string().required('Bắt buộc!'),
      // .matches(/^[a-zA-Z0-9]+$/, 'Tên sản phẩm không bao gồm ký tự đặc biệt'),
      priceProduct: Yup.number().min(500, 'Vui lòng nhập giá tiền lớn hơn 500 VND').required('Bắt buộc!'),
    }),

    onSubmit: (values) => {
      //UPDATE PRODUCT VALUE
      try {
        //set again value from form user edit
        console.log(values);
        var updateProduct = {
          ...row.product,
          name: values.nameProduct,
          thumbnail: values.imgProduct,
          salePrice: Number(values.priceProduct),
          promotionPercent: Number(values.percentPromotion),
        };

        update(ref(db, `list-product/${row.product.id}`), updateProduct);

        if (typeof closeDialog == 'function') {
          closeDialog({ productId: row.product.id, productIndex: row.productIndex });
        }

        //do some thing here on register successfully
        enqueueSnackbar(`Successful.`, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    onChange: (e) => {
      console.log(e.target.value);
      formik.setFieldValue('imgProduct', e.target.value);
    },
  });

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label> ID sản phẩm</label>
        <input
          type="text"
          id="idProduct"
          name="idProduct"
          value={formik.values.idProduct}
          onChange={formik.handleChange}
        />
        <label> Tên sản phẩm</label>
        <input
          type="text"
          id="nameProduct"
          name="nameProduct"
          value={formik.values.nameProduct}
          onChange={formik.handleChange}
          placeholder="Nhập tên sản phẩm"
        />
        {formik.errors.nameProduct && <p className="errorMsg"> {formik.errors.nameProduct} </p>}
        <label> Giá sản phẩm</label>
        <input
          type="text"
          id="priceProduct"
          name="priceProduct"
          value={formik.values.priceProduct}
          onChange={formik.handleChange}
          placeholder="Nhập giá sản phẩm"
        />
        {formik.errors.priceProduct && <p className="errorMsg"> {formik.errors.priceProduct} </p>}
        <label> Phần trăm giảm giá sản phẩm</label>
        <input
          type="text"
          id="percentPromotion"
          name="percentPromotion"
          value={formik.values.percentPromotion}
          onChange={formik.handleChange}
          placeholder="Nhập số phần trăm giảm"
        />

        <label> URL hình ảnh sản phẩm</label>
        <input
          type="text"
          id="imgProduct"
          name="imgProduct"
          value={formik.values.imgProduct}
          onChange={formik.handleChange}
          placeholder="Nhập URL sản phẩm"
        />
        <Box style={{ margin: '20px auto' }}>
          <img
            src={formik.values.imgProduct}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                'data:image/png;base64,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';
            }}
            alt=""
          />
        </Box>

        <button type="submit"> Lưu thông tin </button>
      </form>
    </section>
  );
}

export default EditComponent;
