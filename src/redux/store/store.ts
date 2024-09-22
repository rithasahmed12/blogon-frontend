import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice/userSlice";


const store = configureStore({
    reducer:{
        userInfo:userSlice,
    }
})

export default store;