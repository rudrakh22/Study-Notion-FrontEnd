
import {useSelector} from "react-redux"
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart(){
    const {total,totalItems} =useSelector((state)=>state.cart);
    return (
        <div>

            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems ? totalItems :"0"} Courses in Cart</p>
            {
                total>0 ? (
                    <div className="flex mt-8 flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourse/>
                        <RenderTotalAmount/>
                    </div>
                ):(
                    <p className="text-richblack-300 text-3xl text-center mt-14">Your Cart is Empty</p>
                )
            }
        </div>
    )
}