import {useSelector,useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useState,useEffect} from "react";
import IconBtn from "../../../../../Common/IconBtn";
import {useNavigate} from "react-router-dom";
import {editCourseDetails} from "../../../../../../Services/Operations/courseDetailsApi";
import {COURSE_STATUS} from "../../../../../../utils/constants";
import {resetCourseSection,setStep} from "../../../../../../slices/courseSlice";

const PublishedCourse=()=>{

    const {register,handleSubmit,setValue,getValues}=useForm();
    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    })
    const goBack=()=>{
        dispatch(setStep(2));
    }

    const onSubmit=()=>{
        handleCoursePublish()
    }

    const handleCoursePublish=async()=>{
        if((course?.status ===COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
        (course?.status ===COURSE_STATUS.DRAFT && getValues("public")===false)){
            goToCourses();
            return;
        }

        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);
        setLoading(true);
        const result=await editCourseDetails(formData,token);
        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const goToCourses=()=>{
        dispatch(resetCourseSection());
        navigate("/dashboard/my-courses");
    }
    return (
        <div className="rounded-md border-[1px] bg-richblack-800 border-richblack-700 p-6"> 
            <p className="text-2xl font-semibold text-richblack-5">Publish Course</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6 mb-8">
                    <label 
                    htmlFor="public"
                    className="inline-flex items-center text-lg"
                    >
                        <input 
                        type="checkbox"
                        id="public"
                        name="public"
                        {...register("public")}
                        className="form-style rounded-lg h-4 w-4"
                        />
                        <span className="ml-2 text-richblack-400">Make this Course as Public</span>
                    </label>
                </div>

                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                    onClick={goBack}
                    disabled={loading}
                    type="button"
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                        Back
                    </button>
                    <IconBtn
                        disabled={loading}
                        // onclick={goToCourses}
                        text="Save Changes"
                    />
                </div>
            </form>
        </div>
    )
}

export default PublishedCourse;