import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import CatalogCourseCard from './CatalogCourseCard';


const CourseSlider=({Courses})=>{
    return (
        <>
            {
                Courses.length ? (
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={Courses?.length >3}
                    autoplay={{
                        delay: 2500,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    breakpoints={{
                    1024: {
                    slidesPerView: 3,
                    },
                }}
                className='max-h-[30rem]'
                    >
                    {
                    Courses?.map((course,index)=>{
                        return (
                            <SwiperSlide key={index}>
                                <CatalogCourseCard course={course}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                ):(
                    <p className="text-xl text-richblack-font-medium">No Courses Found</p>
                )
            }
        </>
    )
}

export default CourseSlider;