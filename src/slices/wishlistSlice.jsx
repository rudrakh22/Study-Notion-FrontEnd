import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState={
    wishlist:localStorage.getItem("wishlist")? JSON.parse(localStorage.getItem("wishlist")) :[],
    totalWishlist:localStorage.getItem("totalWishlist")?JSON.parse(localStorage.getItem("totalWishlist")) :0,
    totalWishlistItems: localStorage.getItem("totalWishlistItems")?JSON.parse(localStorage.getItem("totalWishlistItems")):0,
}
const wishlistSlice=createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addToWishlist:(state,action)=>{
            const course=action.payload
            const index=state.wishlist.findIndex((item)=>item._id===course._id);
            if(index >=0){
                toast.error("Course already in wishlist");
                return;
            }
            state.wishlist.push(course);
            state.totalWishlistItems++;
            state.totalWishlist+=course.price;
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
            localStorage.setItem("totalWishlistItems",JSON.stringify(state.totalWishlistItems))
            localStorage.setItem("totalWishlist",JSON.stringify(state.totalWishlist))
            toast.success("Course added to wishlist");
        },
        removeFromWishlist:(state,action)=>{
            const courseId=action.payload;
            const index=state.wishlist.findIndex((item)=>item._id===courseId);
            if(index >=0){
                state.totalWishlistItems--;
                state.totalWishlist-=state.wishlist[index].price
                state.wishlist.splice(index,1)
                localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
                localStorage.setItem("totalWishlistItems",JSON.stringify(state.totalWishlistItems))
                localStorage.setItem("totalWishlist",JSON.stringify(state.totalWishlist))
                toast.success("Course removed from wishlist");
            }
        },
        resetWishlist:(state)=>{
            state.wishlist=[]
            state.totalWishlist=0
            state.totalWishlistItems=0
            localStorage.removeItem("wishlist");
            localStorage.removeItem("totalWishlistItems");
            localStorage.removeItem("totalWishlist");
        }
    }
})

export const {addToWishlist,removeFromWishlist,resetWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;