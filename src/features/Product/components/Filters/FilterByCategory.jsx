import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../../firebase';
FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all 0.5s',
      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));
var list = [];
onValue(
  ref(db, '/list-category'),
  (snapshot) => {
    //do firebase
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((x) => {
        list.push(x);
      });
    }
  },
  { onlyOnce: true }
);
function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState(list);
  const classes = useStyles();

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
