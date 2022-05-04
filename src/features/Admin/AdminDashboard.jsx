import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import EnhancedTable from './TableProduct';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Close from '@material-ui/icons/Close';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase';
import AddComponent from './AddForm/AddComponent';
AdminDashboard.propTypes = {};
const useStyle = makeStyles((theme) => ({
  titleql: {
    margin: theme.spacing(4),
    color: 'blue',
    fontWeight: 'bold',
  },
  frametable: {
    margin: 'auto',
    marginBottom: theme.spacing(4),
  },
}));

function AdminDashboard(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  // DIALOG
  const handleClose = (event, reason) => {
    //ADD NEW PRODUCT TO FIREBASE
    setReload(!reload);
    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  var openProductForm = (product) => {
    setOpen(true);
  };

  return (
    <div>
      <Box className={classes.titleql}>QUẢN LÝ SẢN PHẨM</Box>
      <Box style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2vw', marginBottom: '1vw' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#12824C', color: '#FFFFFF' }}
          onClick={() => openProductForm(1)}
        >
          Thêm sản phẩm mới
        </Button>
      </Box>

      <EnhancedTable />

      {/* DIALOG ADD PRODUCT */}
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Close onClick={handleClose} />
        <DialogContent>
          <Box>
            <AddComponent closeDialog={handleClose} />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;
