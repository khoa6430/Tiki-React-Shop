import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from '../../../api/productApi';
import ProductSkeletonsList from '../components/ProductSkeletons';
import ProductList from '../components/ProductList';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../../firebase';
import { Pagination } from '@mui/material';
import _, { filter } from 'lodash';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchEmpty } from '../../../components/Header/SearchComponent/searchSlice';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPage(props) {
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 100,
    page: 1,
  });
  var searchGlobal = useSelector((state) => state.search.searchValue);
  // console.log(searchGlobal);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC',
    _filtercategory: null,
    _filterprice: {
      salePrice_gte: 0,
      salePrice_lte: 0,
    },
    _filterpromotion: false,
    _filterfreeship: false,
    _filtersearch: '',
  });

  const checkAllFilter = (arr) => {
    //check filter search
    if (filters._filtersearch !== '') {
      arr = arr.filter((x) => x.name.includes(filters._filtersearch));
    }

    // check filters sort
    if (filters._sort == 'salePrice:ASC') {
      arr = _.orderBy(arr, ['salePrice'], ['asc']);
    } else {
      arr = _.orderBy(arr, ['salePrice'], ['desc']);
    }

    //check filters category
    if (filters._filtercategory) {
      arr = arr.filter((x) => x.category.id == filters._filtercategory);
    }
    //check filter price
    if (filters._filterprice.salePrice_gte != 0 && filters._filterprice.salePrice_lte == 0) {
      arr = arr.filter((x) => x.salePrice >= filters._filterprice.salePrice_gte);
    } else if (filters._filterprice.salePrice_lte != 0 && filters._filterprice.salePrice_gte == 0) {
      arr = arr.filter((x) => x.salePrice <= filters._filterprice.salePrice_lte);
    } else if (filters._filterprice.salePrice_gte != 0 && filters._filterprice.salePrice_lte != 0) {
      arr = arr.filter(
        (x) => x.salePrice >= filters._filterprice.salePrice_gte && x.salePrice <= filters._filterprice.salePrice_lte
      );
    }

    //check filter service
    if (filters._filterpromotion) {
      arr = arr.filter((x) => x.isPromotion == true);
    }
    if (filters._filterfreeship) {
      arr = arr.filter((x) => x.isFreeShip == true);
    }

    return arr;
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _filtersearch: searchGlobal,
    }));
    //asgin value searchGlobal empty ''
  }, [searchGlobal]);

  useEffect(() => {
    (async () => {
      try {
        // let result = await axios.get("https://api.ezfrontend.com/products");
        // let listproduct = _.map(result.data, product =>{
        //     return {
        //         id:product.id ,
        //         productId: product.productId ?? product.id,
        //         title: product.title ?? '',
        //         description: product.description,
        //         created_by : product.created_by ?? '',
        //         updated_by : product.updated_by ?? '',
        //         created_at : product.created_at ,
        //         updated_at : product.updated_at,
        //         name: product.name ,
        //         shortDescription: product.shortDescription ,
        //         originalPrice: product.originalPrice,
        //         salePrice: product.salePrice,
        //         isPromotion: product.isPromotion,
        //         promotionPercent: product.promotionPercent,
        //         isFreeShip: product.isFreeShip,
        //         category: {
        //             id: product.category.id,
        //             name: product.category.name,
        //             searchTerm: product.category.searchTerm,
        //             created_by: product.category.created_by  ?? '',
        //             updated_by: product.category.updated_by  ?? '',
        //             created_at: product.category.created_at  ?? '',
        //             updated_at: product.category.updated_at  ?? ''
        //         },
        //         thumbnail: 'https://salt.tikicdn.com/cache/200x200/ts/product/c0/33/41/6c3d891545e253c5bc04da2d185cd21d.jpg.webp',

        //     }
        // })

        // console.log(listproduct);
        // for(var i=0;i<listproduct.length;i++){
        //     console.log(listproduct[i]);
        //     set(ref(db, `list-product/${listproduct[i].id}` ),listproduct[i]);
        // }

        onValue(ref(db, '/list-product'), (snapshot) => {
          //do firebase
          const data = snapshot.val();
          const startsp = (filters._page - 1) * 9; //0 9
          const limitforpg = (filters._page - 1) * 9 + 9; //9 18
          var arr = [];
          if (data !== null) {
            Object.values(data).map((todo) => {
              arr.push(todo);
            });

            //FILTER ARRAY
            arr = checkAllFilter(arr);

            setProductList(arr.slice(startsp, limitforpg));

            if (
              filters._filtercategory ||
              filters._filterprice.salePrice_gte != 0 ||
              filters._filterprice.salePrice_lte != 0 ||
              filters._filterpromotion ||
              filters._filterfreeship ||
              filters._filtersearch !== ''
            ) {
              setPagination((prevPagination) => ({
                ...prevPagination,
                total: arr.length,
                page: filters._page, //2
              }));
            } else {
              setPagination((prevPagination) => ({
                ...prevPagination,
                page: filters._page, //2
              }));
            }
          }
        });
      } catch (error) {
        console.log('Failed to fetch product list:', error);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };
  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  const handleFilterChange = (newFilters) => {
    // newFilters._filterprice.salePrice_gte = parseFloat(newFilters._filterprice.salePrice_gte);
    // newFilters._filterprice.salePrice_lte = parseFloat(newFilters._filterprice.salePrice_lte);
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));
  };
  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <Box style={{ marginBottom: '5%' }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper evalation={0}>
              <ProductFilter filters={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper evalation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={setNewFilters} />

              {loading ? <ProductSkeletonsList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
