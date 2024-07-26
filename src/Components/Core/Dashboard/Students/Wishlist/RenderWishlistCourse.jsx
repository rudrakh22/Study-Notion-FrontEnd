import {useSelector,useDispatch} from "react-redux";
import ReactStars from "react-rating-stars-component";
import {RiDeleteBinLine} from "react-icons/ri";
import {FaStar} from "react-icons/fa";
import GetAvgRating from "../../../../../utils/avgRating";
import {removeFromWishlist} from "../../../../../slices/wishlistSlice";
import {addToCart} from "../../../../../slices/cartSlice";

export default function RenderCartCourse(){
    const {wishlist} =useSelector((state)=>state.wishlist);
    const dispatch=useDispatch();

    return (
        <div className="flex flex-1 flex-col ">
            {
                wishlist.map((course,index)=>{
                    const avgRatingCount=GetAvgRating(course?.ratingAndReviews);
                    return (
                        <div
                        key={index}
                        className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                            index !== wishlist.length-1 && "border-b border-b-richblack-400 pb-6"
                        } ${index !== 0 && "mt-6"}`}
                        >
                            {/* left part */}
                            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                                <img src={course?.thumbnail} 
                                alt={course.name}
                                className="h-[148px] w-[220px] rounded-lg object-cover"
                                />
                                <div className="flex flex-col space-y-1">
                                    <p
                                    className="text-lg font-medium text-richblack-5"
                                    >{course?.courseName}</p>
                                    <p className="text-sm text-richblack-300 ">{course?.category?.name}</p>
                                    {/* rating section */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-yellow-5 ">{avgRatingCount || 0}</span>
                                        <ReactStars
                                            count={5}
                                            value={avgRatingCount || 0}
                                            edit={false}
                                            size={20}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar/>}
                                            halfIcon={<FaStar/>}
                                            fullIcon={<FaStar/>}
                                        />
                                        <span className="text-richblack-400 text-sm">
                                            {course?.ratingAndReviews?.length} Rating
                                        </span>
                                    </div>
                                </div> 
                            </div>

                            {/* right part */}
                            <div>
                                <button
                                onClick={()=>{
                                    dispatch(removeFromWishlist(course._id))
                                }}
                                className="flex items-center gap-x-1 rounded-md border-b-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                                >
                                    <RiDeleteBinLine />
                                    <span>Remove</span>
                                </button>
                                <p
                                className="mb-6 text-3xl font-medium text-yellow-100"
                                >Rs {course?.price}</p>
                                <button
                                className="rounded-md border border-richblack-600 bg-richblack-800 py-3 px-[17px]   text-yellow-50 hover:bg-richblack-200 hover:border-richblack-5 hover:text-richblack-5 hover:font-bold"
                                onClick={()=>{
                                    dispatch(removeFromWishlist(course._id));
                                    dispatch(addToCart(course));
                                }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}