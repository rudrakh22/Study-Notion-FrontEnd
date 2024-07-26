import { useSelector } from "react-redux";
import RenderTotalWishlistAmount from "./RenderTotalWishlistAmount";
import RenderWishlistCourse from "./RenderWishlistCourse";

export default function BookmarkedCourses() {
  const { totalWishlist, totalWishlistItems } = useSelector(
    (state) => state.wishlist
  );

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Your Wishlist
      </h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalWishlistItems} Course in Wishlist
      </p>
      {totalWishlist > 0 ? (
        <div className="mt-8 flex flex-col-reverse lg:flex-row items-start gap-x-10 gap-y-6 ">
          <RenderWishlistCourse />
          <RenderTotalWishlistAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-richblack-100 text-3xl">
          Your Wishlist is Empty
        </p>
      )}
    </div>
  );
}
