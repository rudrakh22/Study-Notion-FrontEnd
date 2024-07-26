import {useSelector} from "react-redux";
import {GrFormAdd} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import CourseTable from "./CourseTable";
import IconBtn from "../../../../Common/IconBtn";
import {fetchInstructorCourses} from "../../../../../Services/Operations/courseDetailsApi"
const MyCourse=()=>{

    const {token}=useSelector((state)=>state.auth);
    const [instructorCourses,setInstructorCourses] = useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const getInstructorCourses=async()=>{
            try{
                const response=await fetchInstructorCourses(token);
                if(response){
                    setInstructorCourses(response);
                }
            }catch(error){
                toast.error("Something went wrong");
            }
        }
        getInstructorCourses();
    },[])
    return (
        <>
            <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl text-richblack-50">My Courses</h1>
                <IconBtn 
                text="Add Course"
                onclick={()=>navigate("/dashboard/add-course")}
                >
                    <GrFormAdd fontSize={25}/>
                </IconBtn>
            </div>
        </div>
        {
            instructorCourses && (
                <CourseTable
                instructorCourses={instructorCourses}
                setInstructorCourses={setInstructorCourses}
                />
        )}
        </>
    )
}

export default MyCourse;