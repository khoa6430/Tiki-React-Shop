import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';
import searchReducer from '../components/Header/SearchComponent/searchSlice';
const {configureStore} = require('@reduxjs/toolkit');

const rootReducer = {
    user : userReducer,
    cart : cartReducer,
    search : searchReducer
};

const store = configureStore({
    reducer : rootReducer,
});

export default store;





















