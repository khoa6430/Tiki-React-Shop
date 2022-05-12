import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from "react";
import { useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import SlideTabCategory from "./components/SlideTabCategory/SlideTabCategory";
import AdminDashboard from './features/Admin/AdminDashboard';
import CartFeature from "./features/Cart";
import ThanksYouFeature from "./features/Cart/thank";
import HomeComponent from "./features/Home/HomeComponent";
import ProductFeature from './features/Product';


function App() {

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
      {/*  Nếu bỏ sẽ match đúng component => HomeComponent sẽ ko dc render  */}
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
