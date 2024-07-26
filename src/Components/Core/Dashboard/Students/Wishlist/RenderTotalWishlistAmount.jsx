import {useDispatch,useSelector} from "react-redux";
import IconBtn from "../../../../Common/IconBtn";
import {removeFromWishlist} from "../../../../../slices/wishlistSlice";
import {addToCart} from "../../../../../slices/cartSlice";

export default function RenderTotalAmount(){

    const {totalWishlist,wishlist}=useSelector((state)=>state.wishlist);
    const dispatch=useDispatch();
    const handleAddToCart = ()=>{
        wishlist.map((course)=>{
            dispatch(addToCart(course))
            dispatch(removeFromWishlist(course._id))
            return 1;
        })
    }

    return (
        <div className="min-h-[200px] rounded-md border-[1px] border-richblue-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total Amount:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {totalWishlist}</p>
            <IconBtn
            text="Add all to Cart"
            onclick={handleAddToCart}
            customClasses={"w-full justify-center"}
            />
        </div>
    )
}