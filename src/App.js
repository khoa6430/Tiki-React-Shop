import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes, Switch } from "react-router-dom";
import "./App.css";
import AlbumFeature from "./features/Album";
import TodoFeature from "./features/Todo";
import ProductFeature from './features/Product';
import NotFound from "./components/NotFound";
import productApi from "./api/productApi";
import Header from "./components/Header";
import { Button } from '@material-ui/core'; 
import { useSnackbar } from "notistack";
import CartFeature from "./features/Cart";
import ThanksYouFeature from "./features/Cart/thank";
import Footer from "./components/Footer/Footer";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch } from 'react-redux';
import { getMe } from './features/Auth/userSlice';
import Login from "./features/Auth/component/Login";
import { unwrapResult } from '@reduxjs/toolkit';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AdminDashboard from './features/Admin/AdminDashboard';
import HomeComponent from "./features/Home/HomeComponent";


function App() {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
    // useEffect(()=>{
    //   const fetchProducts = async()=>{
    //     const params={
    //       _limit:10,
    //     };
    //     const productList = await productApi.getAll(params);
    //     console.log(productList);
    //   }
    //   fetchProducts();
    // },[]);

    // const showNoti = ()=>{
    //   enqueueSnackbar(`Successful.`, { variant: "success" });
    // };

    const firebaseConfig = {
      apiKey: "AIzaSyD75OomAbRdEue8mGiSuk0mGOQnngjhhEc",
      authDomain: "photo-app-redux-650be.firebaseapp.com",
      databaseURL: "https://photo-app-redux-650be-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "photo-app-redux-650be",
      storageBucket: "photo-app-redux-650be.appspot.com",
      messagingSenderId: "669361053627",
      appId: "1:669361053627:web:df1b10443b3ea95c4aae9e",
      measurementId: "G-928HXQ36G6"
    };
    
    firebase.initializeApp(firebaseConfig);

    
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={HomeComponent} exact />
  
        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>
        <Route path="/thanks" component={ThanksYouFeature}/>
        <Route path="/admin-dashboard" component={AdminDashboard}/>
        <Route component={NotFound} />
      </Switch>
      <Footer />
      
      
    </div>
    ); 
  }
export default App;
