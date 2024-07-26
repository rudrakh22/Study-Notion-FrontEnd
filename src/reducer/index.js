import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import courseReducer from "../slices/courseSlice"; 
import loadingBarReducer from "../slices/loadingBarSlice"
import viewCourseReducer from "../slices/viewCourseSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    loadingBar: loadingBarReducer,
});

export default rootReducer;