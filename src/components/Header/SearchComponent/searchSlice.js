const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name:'search',
    initialState:{
        searchValue : '',
    },
    reducers:{  //action
        showSearchValue(state){
            console.log("reducer: ",state.searchValue);
        },
        setSearchEmpty(state){
            state.searchValue = '';
        },
        setSearchValue(state,action){    

            const newvalue = action.payload;
            state.searchValue = newvalue;
        },
 
    },
});

const {actions,reducer} = cartSlice;
export const {setSearchValue,setSearchEmpty,showSearchValue } = actions; //named export
export default reducer; //default export



























