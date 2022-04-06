import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { SnackbarProvider } from 'notistack';
//alt + shift + o để ss lại import
ReactDOM.render(

  
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider autoHideDuration={2000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>,


  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
