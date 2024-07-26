import {useSelector,useDispatch} from "react-redux";
import {useState,useEffect} from "react";
import {setEditCourse,setCourse} from "../../../../slices/courseSlice";
import {getFullDetailsOfCourse} from "../../../../Services/Operations/courseDetailsApi";
import {useParams} from "react-router-dom";
import RenderSteps from "./AddCourse/RenderSteps";
const EditCourse=()=>{
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId,token);

            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])

    if(loading){
        return (
            <div className="grid place-items-center flex-1">
                <div className="spinner"></div>
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-richblack-5 font-medium mb-14 text-3xl">Edit Course</h1>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (
                        <RenderSteps/>
                    ):(
                        <div className="flex justify-center items-center border-[2px] border-richblack-800 py-14 w-full">
                            <p className="text-3xl font-medium text-richblack-5">Course Not Found</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourse;