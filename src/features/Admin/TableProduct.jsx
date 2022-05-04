import { Button, makeStyles } from '@material-ui/core';
import { DeleteOutlined, FilterListOutlined } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { onValue, ref } from 'firebase/database';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { db } from '../../firebase';
import EditComponent from './EditForm/EditComponent';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  imgProduct: {
    with: '100px',
    height: '100px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//ORDER WHEN CLICK LABEL
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//Head cell table
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sản phẩm',
  },
  {
    id: 'salePrice',
    numeric: true,
    disablePadding: false,
    label: 'Giá tiền',
  },
  {
    id: 'fat',
    numeric: false,
    disablePadding: true,
    label: 'Loại sản phẩm',
  },
  {
    id: 'carbs',
    numeric: false,
    disablePadding: false,
    label: 'Hình ảnh',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Hoạt động',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  //sort
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

//TOOL BAR

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Thông tin sản phẩm
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
var getData = [];
//GET DATA IN FIRST RENDER
onValue(
  ref(db, '/list-product'),
  (snapshot) => {
    //do firebase
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((item) => {
        getData.push(item);
      });
    }
  },
  {
    onlyOnce: true,
  }
);

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('salePrice');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(35);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState(getData);

  //GET DATA FROM DATABASE
  // useEffect(() => {
  //   try {
  //     //GET DATA FROM FIREBASE

  //     const foo = async () => {
  //       const getdata = await ref(db, '/list-product2');
  //       onValue(
  //         getdata,
  //         (snapshot) => {
  //           //do firebase
  //           const data = snapshot.val();

  //           if (data !== null) {
  //             Object.values(data).map((item) => {
  //               getDataFireBase.push(item);
  //             });
  //           }
  //         }
  //         // {
  //         //   onlyOnce: true,
  //         // }
  //       );
  //       console.log('row', rows);
  //       setRows(getDataFireBase);
  //     };
  //     foo();

  //     // onValue(

  //     //   ref(db, '/list-product2'),
  //     //   (snapshot) => {
  //     //     //do firebase
  //     //     const data = snapshot.val();
  //     //     console.log('data:', data);
  //     //     if (data !== null) {
  //     //       Object.values(data).map((item) => {
  //     //         rows.push(item);
  //     //       });
  //     //     }
  //     //   },
  //     //   {
  //     //     onlyOnce: true,
  //     //   }
  //     // );
  //     // rows = [
  //     //   {
  //     //     category: {
  //     //       created_at: '2020-10-18T06:06:55.456Z',
  //     //       created_by: '',
  //     //       id: 3,
  //     //       name: 'Làm đẹp',
  //     //       searchTerm: 'lam dep',
  //     //       updated_at: '2020-10-18T06:06:55.456Z',
  //     //       updated_by: '',
  //     //     },
  //     //     created_at: '2020-10-18T06:08:27.769Z',
  //     //     created_by: '',
  //     //     description:
  //     //       '<div><div class="details-block">\n                              <h4 style="font-size: 13px; line-height: 40px; font-weight: 400; margin: 0; border-bottom: 1px solid #a2a2a2; margin-bottom: 10px;">CHI TIẾT SẢN PHẨM</h4>\n                              <div id="editor-content"><h2><span style="font-size: 24pt">Phân sữa Thái - Làm đẹp hoa</span></h2><p><span style="font-size: 24pt"><img src="http://media3.scdn.vn/img3/2019/4_22/mJFWgy_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto; display: block"><br><br><img src="http://media3.scdn.vn/img3/2019/4_22/yztZdu_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto; display: block"><br><br><img src="http://media3.scdn.vn/img3/2019/4_22/mfgtcQ_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto; display: block"><br><br><img src="http://media3.scdn.vn/img3/2019/4_22/Y6eTgz_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto; display: block"><br></span><span style="font-size: 14pt"><em><strong>Phân sữa Thái - Làm đẹp hoa</strong></em></span></p><p style="color: #212529; font-size: 14px"><span style="font-size: 14pt">Công dụng:</span></p><p style="color: #212529; font-size: 14px"><span style="font-size: 14pt">Sữa thái là một chế phẩm hổn hợp các nguyên tố vi lượng giúp điều hoà sinh trưởng cho cây trồng. Sử dụng phun trên lá để thúc đẩy trổ hoa trên cây trưởng thành, cung cấp và bổ sung sự thiếu hụt các nguyên tố vi lượng</span></p><p style="color: #212529; font-size: 14px"><span style="font-size: 14pt">Sử dụng cho Hoa hồng Hoa lan</span></p><p style="font-size: 14px"><span style="font-size: 14pt">Công dụng: Rx Plant Tonic là một hỗn hợp các nguyên tố vi lượng. Giúp điều hoà sinh trưởng cho cây trồng. Sử dụng phụ trên lá để thúc đẩy ra hoa trên cây trưởng thành. Cung cấp và bổ sung sự thiếu hụt các nguyên tố vi lượng trên cây trồng.</span></p><p style="font-size: 14px"><span style="font-size: 14pt">Sử dụng: pha 1ml + 1 lít nước. Nên pha chung với phân bón NPK thông dụng như 20-20-20 để tăng hiệu quả chăm sóc. Phụ định kỳ 1-2 lần 1 tuần.</span></p><p style="font-size: 14px"><span style="font-size: 14pt">Hạn sử dụng: 4 năm ( ngày sản xuất xem trên nhãn)</span></p><p style="font-size: 14px"><span style="font-size: 14pt"><br></span></p><p><span style="font-size: 14pt"></span></p></div>\n                            </div>\n                        </div>',
  //     //     id: 17617592,
  //     //     isFreeShip: false,
  //     //     isPromotion: false,
  //     //     name: 'Phân sữa Thái - Làm đẹp hoa',
  //     //     originalPrice: 50000,
  //     //     productId: 17617592,
  //     //     promotionPercent: 0,
  //     //     salePrice: 50000,
  //     //     shortDescription:
  //     //       'Phân sữa Thái - Làm đẹp hoaPhân sữa Thái - Làm đẹp hoaCông dụng:Sữa thái là một chế phẩm hổn hợp các nguyên tố vi lượng giúp điều hoà sinh trưởng cho cây trồng. Sử dụng phun trên lá để thúc đẩy trổ hoa trên cây trưởng thành, cung cấp và bổ sung sự th...',
  //     //     thumbnail:
  //     //       'https://salt.tikicdn.com/cache/200x200/ts/product/c0/33/41/6c3d891545e253c5bc04da2d185cd21d.jpg.webp',
  //     //     title: '',
  //     //     updated_at: '2020-10-18T06:08:27.769Z',
  //     //     updated_by: '',
  //     //   },
  //     //   {
  //     //     category: {
  //     //       created_at: '2020-10-18T06:06:55.456Z',
  //     //       created_by: '',
  //     //       id: 3,
  //     //       name: 'Làm đẹp',
  //     //       searchTerm: 'lam dep',
  //     //       updated_at: '2020-10-18T06:06:55.456Z',
  //     //       updated_by: '',
  //     //     },
  //     //     created_at: '2020-10-18T06:08:27.769Z',
  //     //     created_by: '',
  //     //     description:
  //     //       '<div><div class="details-block">\n                              <h4 style="font-size: 13px; line-height: 40px; font-weight: 400; margin: 0; border-bottom: 1px solid #a2a2a2; margin-bottom: 10px;">CHI TIẾT SẢN PHẨM</h4>\n                              <div id="editor-content"><p style="text-align: center;"><span style="font-size: 24pt; color: rgb(255, 0, 0);">Vòng Lắc Eo Massage - Làm Đẹp</span></p><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><img src="http://media3.scdn.vn/img4/2020/05_07/lyHAIDBSrWux0RbBQLLe_simg_d0daf0_800x1200_max.png" style="margin: 0 auto;display:block;"><br><span style="font-size: 14pt; color: rgb(0, 0, 0);">Lắc vòng là một môn thể thao rất tốt, giúp bạn có một cơ bụng săn chắc. Ngoài ra, nó còn làm các khớp ở vùng hông, cột sống hoạt động tốt hạn chế việc thoái hóa các khớp sau này. Khi lắc vòng, cơ thể phải vận động các nhóm cơ ở thành bụng, cơ lưng, cơ hoành và cả hệ cơ vùng tiểu khung. <strong>Vòng lắ</strong><strong>c giảm eo </strong>mà Trùm Giá Sỉ<strong> </strong>giới thiệu sẽ giúp bạn có được vòng eo như ý và một cơ thể khỏe mạnh.</span><br></span></p><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/y4JnQ16U2k2R6vFSmz4A_simg_d0daf0_800x1200_max.jpg"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/aUiWZWOcoXrik1t9H9VC_simg_d0daf0_800x1200_max.jpg"></span></span></p><div><h3 style="color: #141414; font-size: 1.25em;"><span style="color: #0000ff;"><strong><span style="font-size: 18px;">Thông Tin Chi Tiết Vòng Lắc Giảm Eo</span></strong></span></h3></div><div><ul><li>Tên sản phẩm: <span style="color: #333333;">Vòng lắc giảm eo</span></li><li>Xuất xứ: Đài Loan</li><li>Chất liệu: Nhựa cao cấp.</li><li>01 vòng nhựa có hạt massage bên trong.</li><li>Đường kính (khi lắp) 96 cm.</li><li>Nhiều màu sắc trên vòng.</li><li>Chất liệu nhựa cứng, mỗi khúc một màu sắc khác nhau rất sinh động: Vàng, hồng, xanh, đỏ.</li><li>Đường kính vòng khi lắp 96 cm, chiều dài mỗi khúc 36 cm.</li><li>Lắp ghép từ 8 khúc khác nhau, lắp và tháo gỡ rất dễ dàng nên rất cơ động khi cần di chuyển.</li><li>Lực chuyển động từ vòng lắc cùng 45 mắt cao su lồi có tác dụng massage, làm tiêu mỡ và săn chắc vùng eo hiệu quả.</li><li>Hỗ trợ khớp không hoạt động tốt, giảm đau lưng &amp; làm chậm thoái hóa khớp.</li><li>Tạo sự mềm mại uyển chuyển, cho bạn một thân hình cân đối.</li><li>Bạn có thể tập lắc eo ở bất cứ đâu: văn phòng, đi du lịch.</li><li>Bao bì: Hộp giấy (41 x 24 x 7 cm).</li></ul></div><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/6QBPxdnkmXAapst5bosh_simg_d0daf0_800x1200_max.jpg"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/gMXxIww11D8N9LUoNmGT_simg_d0daf0_800x1200_max.png"><br><br><img style="margin: 0 auto; display: block;" src="http://media3.scdn.vn/img4/2020/05_07/BkCifQuImj1PlYJ6IKnZ_simg_d0daf0_800x1200_max.png"><br><br></span></span></p><div><h3 style="color: #141414; font-size: 1.25em;"><span style="color: #0000ff; font-size: 18px;"><strong>Cách Lắc Vòng Eo</strong></span></h3></div><div><ul><li>Đứng thẳng, hai chân dang ra một chút. Người mới bắt đầu tập có thể đặt một chân của bạn nhẹ ở phía trước để giữ cân bằng tốt hơn.</li><li>Giữ vòng bằng cả hai tay và đặt nó ở vị trí eo của bạn, một phần chạm vào lưng.</li><li>Không dùng tay mà dùng eo để giữ cho vòng lắc quanh eo theo chiều ngược kim đồng hồ.</li><li>Những lần đầu tập, có thể bạn sẽ lo lắng vì chưa biết cách giữ cho vòng không bị rơi. – Nhưng sau đó, sự chuyển động uyển chuyển của cơ thể sẽ giúp bạn giữ thăng bằng cho vòng tốt hơn.</li><li>Bạn có thể kết hợp múa với lắc vòng – đây là một cách thú vị mà những người yêu thích âm nhạc và khiêu vũ ưa thích. Họ kết hợp như vậy để giữ cho cơ thể săn chắc hơn.</li></ul><h2 style="color: #212529; font-size: 1.6rem;"><span style="font-size: 18pt;"><span style="color: #ff0000;"><strong>Thông tin liên hệ:</strong></span></span></h2><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;"><strong>Chúng tôi cam kết bán hàng chính hãng, hỗ trợ đổi trả nếu phát hiện hàng giả, hàng nhái, hàng kém chất lượng !!!</strong></span></p><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;"><strong><span style="color: #0000ff;">Hotline &amp; Zalo :</span> <span style="color: #ff0000;">0982.012.612 - 0986.210342</span> (ZALO)</strong></span></p><p style="color: #212529; font-size: 14px;"><span style="font-size: 14pt;">Khuyến khích quý khách hàng mua hàng online tại <a href="https://www.sendo.vn/shop/trum-gia-si-hcm" rel="nofollow">https://www.sendo.vn/shop/trum-gia-si-hcm</a> để nhận được các ưu đãi miễn phí vận chuyển toàn quốc, giá tốt nhất trên online, đổi trả hàng nhanh chóng!</span></p><p style="color: rgb(33, 37, 41); font-size: 14px; text-align: center;"><span style="font-size: 18pt;"><strong><br><span style="font-size: 14pt;"><span style="font-size: 24pt;"><a title="Xem các sản phẩm khác tại đây !" href="https://www.sendo.vn/shop/trum-gia-si-hcm" rel="nofollow">Xem các sản phẩm khác <span style="color: #0000ff;">tại đây !</span></a></span></span></strong></span></p></div><p style="text-align: left;"><span style="font-size: 24pt; color: rgb(255, 0, 0);"><span style="font-size: 14pt; color: rgb(0, 0, 0);"><br><br></span></span></p></div>\n                            </div>\n                        </div>',
  //     //     id: 29398434,
  //     //     isFreeShip: false,
  //     //     isPromotion: true,
  //     //     name: '[FreeShip] Vòng Lắc Massage Bụng - Làm Đẹp',
  //     //     originalPrice: 199000,
  //     //     productId: 29398434,
  //     //     promotionPercent: 33,
  //     //     salePrice: 135000,
  //     //     shortDescription:
  //     //       'Vòng Lắc Eo Massage - Làm ĐẹpLắc vòng là một môn thể thao rất tốt, giúp bạn có một cơ bụng săn chắc. Ngoài ra, nó còn làm các khớp ở vùng hông, cột sống hoạt động tốt hạn chế việc thoái hóa các khớp sau này. Khi lắc vòng, cơ thể phải vận động các nhó...',
  //     //     thumbnail:
  //     //       'https://salt.tikicdn.com/cache/200x200/ts/product/c0/33/41/6c3d891545e253c5bc04da2d185cd21d.jpg.webp',
  //     //     title: '',
  //     //     updated_at: '2020-10-18T06:08:27.769Z',
  //     //     updated_by: '',
  //     //   },
  //     // ];
  //     console.log('1');
  //   } catch (error) {
  //     console.log('Failed to fetch product list:', error);
  //   }
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // DIALOG
  const handleClose = (event, reason) => {
    //my self
    //GET DATA WHEN USER UPDATE PRODUCT IN FIRST RENDER
    const reloadDataEdit = [];
    onValue(
      ref(db, '/list-product'),
      (snapshot) => {
        //do firebase
        const data = snapshot.val();
        console.log('data:', data);
        if (data !== null) {
          Object.values(data).map((item) => {
            reloadDataEdit.push(item);
          });
          setRows(reloadDataEdit);
        }
      }
      // {
      //   onlyOnce: true,
      // }
    );
    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  const [productClick, setProductClick] = React.useState(null);

  var editProductForm = (product) => {
    setOpen(true);
    setProductClick(product);
  };
  const { enqueueSnackbar } = useSnackbar();
  var deleteProduct = (product) => {
    try {
      // remove(ref(db,`list-product/${product.id}`));

      //do some thing here on register successfully
      enqueueSnackbar(`Thành công.`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('Xóa sản phẩm thất bại', error);
    }
  };
  const [reload, setReload] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* TOOL BAR TABLE */}
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>

                      <TableCell align="right">{row.salePrice}</TableCell>
                      <TableCell align="left">{row.category.name}</TableCell>
                      <TableCell align="right">
                        <img src={row.thumbnail} alt="logouser" className={classes.imgProduct} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          className="buttonedit"
                          onClick={() => editProductForm(row)}
                        >
                          <EditIcon />
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          className="buttonremove"
                          onClick={() => deleteProduct(row)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />

      {/* DIALOG EDIT */}
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Close onClick={handleClose} />
        <DialogContent>
          <Box>
            <EditComponent closeDialog={handleClose} product={productClick} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
