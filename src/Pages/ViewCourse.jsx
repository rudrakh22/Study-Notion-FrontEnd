import {useEffect,useState} from "react";
import {Outlet,useParams} from "react-router-dom";
import {getFullDetailsOfCourse} from "../Services/Operations/courseDetailsApi";
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNumberOfLectures,
} from "../slices/viewCourseSlice";
import {useSelector,useDispatch} from "react-redux";
import VideoDetailsSidebar from "../Components/Core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../Components/Core/ViewCourse/CourseReviewModal";

export default function ViewCourse(){

    const {courseID}=useParams();
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const [reviewModal,setReviewModal]=useState(false);

    useEffect(()=>{
        ;(async()=>{
            const courseData=await getFullDetailsOfCourse(courseID,token);
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures=0;
            courseData.courseDetails.courseContent?.forEach((sec)=>{
                lectures+=sec.subSection.length ||0;
            })
            dispatch(setTotalNumberOfLectures(lectures));
        })()
    },[])


    return (
        
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSidebar setReviewModal={setReviewModal}/>
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet/>
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}