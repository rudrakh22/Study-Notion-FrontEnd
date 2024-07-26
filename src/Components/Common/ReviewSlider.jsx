import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../Services/apiConnector";
import { ratingsEndpoints } from "../../Services/apis";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncatedWords = 15;
  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );

      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);
  return (
    <div className="text-white w-full h-full flex items-center justify-center">
      <div className="my-[50px] h-full max-w-maxContentTab w-full lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="w-full ">
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px]  text-richblack-25  items-center justify-center">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review.user?.image
                        ? review.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p>
                  {review?.review.split(" ").length > truncatedWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncatedWords)
                        .join(" ")}...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review?.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
