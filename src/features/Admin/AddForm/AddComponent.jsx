import { Box } from '@material-ui/core';
import { ref, set } from 'firebase/database';
import { Field, useFormik, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import { db } from '../../../firebase';
import CustomSelect from './CustomSelect';

AddComponent.propTypes = {
  closeDialog: PropTypes.func,
};

function AddComponent(props) {
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const formik = useFormik({
    initialValues: {
      idProduct: getRandomInt(10000000),
      nameProduct: '',
      idCategoryProduct: '',
      priceProduct: '',
      imgProduct: '',
    },
    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      //UPDATE PRODUCT VALUE
      try {
        //set again value from form user edit
        var nameofCategory =
          values.idCategoryProduct == 0
            ? 'Thời trang nam'
            : values.idCategoryProduct == 1
            ? 'Thời trang nữ'
            : values.idCategoryProduct == 2
            ? 'Khẩu trang'
            : values.idCategoryProduct == 3
            ? 'Làm đẹp'
            : values.idCategoryProduct == 4
            ? 'Laptop'
            : values.idCategoryProduct == 5
            ? 'Ổ cứng'
            : values.idCategoryProduct == 6
            ? 'Điện thoại'
            : values.idCategoryProduct == 7
            ? 'Sách'
            : '';

        var updateProduct = {
          category: {
            id: values.idCategoryProduct,
            name: nameofCategory,
          },
          description:
            '<div><div class="details-block">\n<h4 style="font-size: 13px; line-height: 40px; font-weight: 400; margin: 0; border-bottom: 1px solid #a2a2a2; margin-bottom: 10px;">CHI TIẾT SẢN PHẨM</h4>\n                              <div id="editor-content"><p style="text-align: center;"><span style="font-size: 24pt; color: rgb(255, 0, 0);">Vòng Lắc Eo Massage - Làm Đẹp</span></p><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><img src="http://media3.scdn.vn/img4/2020/05_07/lyHAIDBSrWux0RbBQLLe_simg_d0daf0_800x1200_max.png" style="margin: 0 auto;display:block;"><br><span style="font-size: 14pt; color: rgb(0, 0, 0);">Lắc vòng là một môn thể thao rất tốt, giúp bạn có một cơ bụng săn chắc. Ngoài ra, nó còn làm các khớp ở vùng hông, cột sống hoạt động tốt hạn chế việc thoái hóa các khớp sau này. Khi lắc vòng, cơ thể phải vận động các nhóm cơ ở thành bụng, cơ lưng, cơ hoành và cả hệ cơ vùng tiểu khung. <strong>Vòng lắ</strong><strong>c giảm eo </strong>mà Trùm Giá Sỉ<strong> </strong>giới thiệu sẽ giúp bạn có được vòng eo như ý và một cơ thể khỏe mạnh.</span><br></span></p><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/y4JnQ16U2k2R6vFSmz4A_simg_d0daf0_800x1200_max.jpg"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/aUiWZWOcoXrik1t9H9VC_simg_d0daf0_800x1200_max.jpg"></span></span></p><div><h3 style="color: #141414; font-size: 1.25em;"><span style="color: #0000ff;"><strong><span style="font-size: 18px;">Thông Tin Chi Tiết Vòng Lắc Giảm Eo</span></strong></span></h3></div><div><ul><li>Tên sản phẩm: <span style="color: #333333;">Vòng lắc giảm eo</span></li><li>Xuất xứ: Đài Loan</li><li>Chất liệu: Nhựa cao cấp.</li><li>01 vòng nhựa có hạt massage bên trong.</li><li>Đường kính (khi lắp) 96 cm.</li><li>Nhiều màu sắc trên vòng.</li><li>Chất liệu nhựa cứng, mỗi khúc một màu sắc khác nhau rất sinh động: Vàng, hồng, xanh, đỏ.</li><li>Đường kính vòng khi lắp 96 cm, chiều dài mỗi khúc 36 cm.</li><li>Lắp ghép từ 8 khúc khác nhau, lắp và tháo gỡ rất dễ dàng nên rất cơ động khi cần di chuyển.</li><li>Lực chuyển động từ vòng lắc cùng 45 mắt cao su lồi có tác dụng massage, làm tiêu mỡ và săn chắc vùng eo hiệu quả.</li><li>Hỗ trợ khớp không hoạt động tốt, giảm đau lưng &amp; làm chậm thoái hóa khớp.</li><li>Tạo sự mềm mại uyển chuyển, cho bạn một thân hình cân đối.</li><li>Bạn có thể tập lắc eo ở bất cứ đâu: văn phòng, đi du lịch.</li><li>Bao bì: Hộp giấy (41 x 24 x 7 cm).</li></ul></div><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/6QBPxdnkmXAapst5bosh_simg_d0daf0_800x1200_max.jpg"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/gMXxIww11D8N9LUoNmGT_simg_d0daf0_800x1200_max.png"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/BkCifQuImj1PlYJ6IKnZ_simg_d0daf0_800x1200_max.png"><br><br></span></span></p><div><h3 style="color: #141414; font-size: 1.25em;"><span style="color: #0000ff; font-size: 18px;"><strong>Cách Lắc Vòng Eo</strong></span></h3></div><div><ul><li>Đứng thẳng, hai chân dang ra một chút. Người mới bắt đầu tập có thể đặt một chân của bạn nhẹ ở phía trước để giữ cân bằng tốt hơn.</li><li>Giữ vòng bằng cả hai tay và đặt nó ở vị trí eo của bạn, một phần chạm vào lưng.</li><li>Không dùng tay mà dùng eo để giữ cho vòng lắc quanh eo theo chiều ngược kim đồng hồ.</li><li>Những lần đầu tập, có thể bạn sẽ lo lắng vì chưa biết cách giữ cho vòng không bị rơi. – Nhưng sau đó, sự chuyển động uyển chuyển của cơ thể sẽ giúp bạn giữ thăng bằng cho vòng tốt hơn.</li><li>Bạn có thể kết hợp múa với lắc vòng – đây là một cách thú vị mà những người yêu thích âm nhạc và khiêu vũ ưa thích. Họ kết hợp như vậy để giữ cho cơ thể săn chắc hơn.</li></ul><h2 style="color: #212529; font-size: 1.6rem;"><span style="font-size: 18pt;"><span style="color: #ff0000;"><strong>Thông tin liên hệ:</strong></span></span></h2><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;"><strong>Chúng tôi cam kết bán hàng chính hãng, hỗ trợ đổi trả nếu phát hiện hàng giả, hàng nhái, hàng kém chất lượng !!!</strong></span></p><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;"><strong><span style="color: #0000ff;">Hotline &amp; Zalo :</span> <span style="color: #ff0000;">0982.012.612 - 0986.210342</span> (ZALO)</strong></span></p><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;">Khuyến khích quý khách hàng mua hàng online tại <a href="https://www.sendo.vn/shop/trum-gia-si-hcm" rel="nofollow">https://www.sendo.vn/shop/trum-gia-si-hcm</a> để nhận được các ưu đãi miễn phí vận chuyển toàn quốc, giá tốt nhất trên online, đổi trả hàng nhanh chóng!</span></p><p style="color: rgb(33, 37, 41); font-size: 14px; text-align: center;"><span style="font-size: 18pt;"><strong><br><span style="font-size: 14pt;"><span style="font-size: 24pt;"><a title="Xem các sản phẩm khác tại đây !" href="https://www.sendo.vn/shop/trum-gia-si-hcm" rel="nofollow">Xem các sản phẩm khác <span style="color: #0000ff;">tại đây !</span></a></span></span></strong></span></p></div><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><br><br></span></span></p></div>\n                            </div>\n                        </div>',
          isFreeShip: false,
          isPromotion: true,
          originalPrice: 199000,
          promotionPercent: getRandomInt(100),
          shortDescription:
            'Vòng Lắc Eo Massage - Làm ĐẹpLắc vòng là một môn thể thao rất tốt, giúp bạn có một cơ bụng săn chắc. Ngoài ra, nó còn làm các khớp ở vùng hông, cột sống hoạt động tốt hạn chế việc thoái hóa các khớp sau này. Khi lắc vòng, cơ thể phải vận động các nhó...',

          id: values.idProduct,
          name: values.nameProduct,
          thumbnail: values.imgProduct,
          salePrice: Number(values.priceProduct),
        };

        set(ref(db, `list-product/${values.idProduct}`), updateProduct);

        if (closeDialog) {
          closeDialog({ product: updateProduct });
        }

        //do some thing here on register successfully
        enqueueSnackbar(`Successful.`, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    onChange: (e) => {
      formik.setFieldValue('imgProduct', e.target.value);
    },
  });

  const options = [
    { value: 0, label: 'Thời trang nam' },
    { value: 1, label: 'Thời trang nữ' },
    { value: 2, label: 'Khẩu trang' },
    { value: 3, label: 'Làm đẹp' },
    { value: 4, label: 'Laptop' },
    { value: 5, label: 'Ổ cứng' },
    { value: 6, label: 'Điện thoại' },
    { value: 7, label: 'Sách' },
  ];

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
          disabled={true}
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
        <label> Loại sản phẩm</label>
        {/* SELECT CATEGORY PRODUCT */}
        <CustomSelect
          className="Chọn loại sản phẩm"
          onChange={(value) => formik.setFieldValue('idCategoryProduct', value.value)}
          value={formik.values.idCategoryProduct}
          options={options}
        />
        {formik.errors.idCategoryProduct ? <div className="error">{formik.errors.idCategoryProduct}</div> : null}

        {/* END SELECT CATEGORY PRODUCT */}

        <label> Giá sản phẩm</label>
        <input
          type="text"
          id="priceProduct"
          name="priceProduct"
          value={formik.values.priceProduct}
          onChange={formik.handleChange}
          placeholder="Nhập giá sản phẩm"
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

export default AddComponent;
