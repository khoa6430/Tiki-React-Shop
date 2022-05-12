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
import { onValue, ref, remove } from 'firebase/database';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import EditComponent from './EditForm/EditComponent';
import './style.scss';
import { formatPrice } from '../../utils';
import _, { set } from 'lodash';
const useStyles = makeStyles((theme) => ({
  imgProduct: {
    with: '100px',
    height: '100px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

EnhancedTable.propTypes = {};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  // console.log('order by', orderBy);
  if (orderBy == 'category') {
    if (b[orderBy].name < a[orderBy].name) {
      return -1;
    }
    if (b[orderBy].name > a[orderBy].name) {
      return 1;
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
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
  // console.log('compara', comparator);
  // console.log('array', array);
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
    id: 'category',
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

//MAIN
export default function EnhancedTable(props) {
  const { productAdd } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('salePrice');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState(getData);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (productAdd != null) {
      rows.unshift(productAdd);
      console.log(rows);
      setRows(rows);
      setReload(!reload);
    }
  }, [productAdd]);

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
    var productHasEdit;
    onValue(
      ref(db, `/list-product/${event.productId}`),
      (snapshot) => {
        //do firebase
        const data = snapshot.val();

        productHasEdit = data;
        // if (data !== null) {
        //   Object.values(data).map((item) => {
        //     reloadDataEdit.push(item);
        //   });
        //   setRows(reloadDataEdit);
        // }
      },
      {
        onlyOnce: true,
      }
    );
    let index = _.findIndex(rows, (item) => {
      return item.id == event.productId;
    });
    rows[index] = productHasEdit;
    setRows(rows);

    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  const [productClick, setProductClick] = useState(null);

  var editProductForm = (product, productIndex) => {
    setOpen(true);
    setProductClick({ product: product, productIndex: productIndex });
  };
  const { enqueueSnackbar } = useSnackbar();
  var deleteProduct = (product) => {
    try {
      console.log(product.id);
      //Remove in rows
      let index = _.findIndex(rows, (item) => {
        return item.id == product.id;
      });
      console.log(index);
      rows.splice(index, 1);
      // rows[index] = productHasEdit;
      // setRows(rows);

      //Remove in FireBase
      remove(ref(db, `list-product/${product.id}`));
      setReload(!reload);

      //do some thing here on register successfully
      enqueueSnackbar(`Thành công.`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('Xóa sản phẩm thất bại', error);
    }
  };

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

                      <TableCell align="right"> {formatPrice(row.salePrice)}</TableCell>
                      <TableCell align="left">{row.category.name}</TableCell>
                      <TableCell align="right">
                        <img src={row.thumbnail} alt="logouser" className={classes.imgProduct} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          className="buttonedit"
                          onClick={() => editProductForm(row, index)}
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
          rowsPerPageOptions={[5, 10, 25, 100, 200]}
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
            <EditComponent closeDialog={handleClose} row={productClick} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
