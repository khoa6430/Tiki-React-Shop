
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

export const getMe = createAsyncThunk('user/getMe',async(params,thunkAPI)  => {
    //get API
    const currentUser = await userApi.getMe();
    return currentUser;

});
export const getMe2 = createAsyncThunk('user/getMe2',async(payload)  => {
    //get API
    const currentUser = await userApi.getMe2(payload);
    return currentUser;

});

const userSlice = createSlice({
    name:'user',
    initialState:{
        current : {},
        loading : false,
        error : ''
    },
    reducers:{
        logout(state){
            state.current = {}
        },
    },
    extraReducers:{ //  allows createSlice to respond to other action types besides the types it has generated
        [getMe.pending] : (state) =>{
            state.loading= true;
        },
        [getMe.rejected] : (state,action) =>{
            state.loading = false;
            state.error  = action.error;
        },
        [getMe.fulfilled] : (state,action) =>{
            state.loading = false;
            state.current = action.payload;
        },
        [getMe2.pending] : (state) =>{
            state.loading= true;
        },
        [getMe2.rejected] : (state,action) =>{
            state.loading = false;
            state.error  = action.error;
        },
        [getMe2.fulfilled] : (state,action) =>{
            state.loading = false;
            state.current = action.payload;
        },
    }

})

const {actions,reducer :userReducer } = userSlice;
export const {logout} = actions; //named export
export default userReducer;

















































