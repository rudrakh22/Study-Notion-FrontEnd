import { RiDeleteBin6Line } from "react-icons/ri";
import {MdCheckBox} from "react-icons/md";
import {useState} from "react";
import {formatDate} from "../../../../../Services/formatDate"
import {COURSE_STATUS} from "../../../../../utils/constants";
import {AiFillCheckCircle} from "react-icons/ai";
import {BsClockFill} from "react-icons/bs";
import {convertSecondsToDuration} from "../../../../../utils/secToDuration";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteCourse,deleteCourses,fetchInstructorCourses} from "../../../../../Services/Operations/courseDetailsApi"
import {FiEdit2} from "react-icons/fi";
import ConfirmationModal from "../../../../Common/ConfirmationModal";
const CourseTable=({instructorCourses,setInstructorCourses})=>{

    const [checkbox,setCheckbox]=useState([]);
    const [loading,setLoading]=useState(false);
    const [confirmationModal,setConfirmationModal]=useState(null); 
    const {token} =useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const TRUNCATE_LENGTH=30;
    const handleEdit=(courseId)=>{
        navigate(`/dashboard/edit-course/${courseId}`)
    }
    const handleCourseDelete=async(courseId)=>{
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        if(checkbox.includes(courseId)){
            setCheckbox(checkbox.filter(id=>id!==courseId));
        }
        const result=await fetchInstructorCourses(token);
        if(result){
            setInstructorCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
    const addAllCourseId=()=>{
        if(checkbox.length===0 || checkbox.length<instructorCourses.length){
            const allCourseIds=instructorCourses.map((course)=>course._id);
            setCheckbox(allCourseIds);
        }
        else{
            setCheckbox([]);
        }
    }

    const handleSelectedCourseDelete=async()=>{
        if(checkbox.length !==0){
            setLoading(true);
            await deleteCourses(checkbox,token,instructorCourses.length);
            for(const courseId of checkbox){
                setCheckbox(
                    checkbox.filter(id=>id!==courseId)
                )
            }
            const result=await fetchInstructorCourses(token);
            if(result){
                setInstructorCourses(result);
            }
            setConfirmationModal(null);
            setLoading(false);
        }
    }
    const duration=(courseDetails)=>{
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration);
            totalDurationInSeconds += timeDurationInSeconds;
            });
        });
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        return totalDuration;
    }

    return (
        <>
            {
                !instructorCourses?(
                    <div className="spinner"></div>
                ): !instructorCourses.length ?(
                    <p className="grid h-[10vh] w-full place-content-center text-richblack-5 lg:text-3xl">You have not created any course yet</p>
                ):(
                    <div className="rounded-sm border border-richblack-800 p-3">
                        {/* heading */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-x-2 ">
                                <div className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                                    <input 
                                    type="checkbox"
                                    checked={checkbox.length === instructorCourses.length}
                                    onChange={addAllCourseId}
                                    />
                                </div>
                                <div className="text-left text-sm font-medium uppercase text-richblack-100 ">Courses</div>
                            </div>

                            <div className="md:flex justify-between items-center w-full max-w-[30%] hidden mr-4">
                                <div className=" text-sm font-medium uppercase text-richblack-100">
                                    Duration
                                </div>
                                <div className="text-sm font-medium uppercase text-richblack-100">
                                    Price
                                </div>
                                <div className=" text-sm font-medium uppercase text-richblack-100 flex justify-center items-center">
                                    {checkbox.length===instructorCourses.length && 
                                    instructorCourses.length===1 
                                    ? "Actions"
                                    : checkbox.length===instructorCourses.length 
                                    ? ""
                                    : checkbox.length >1
                                    ? ""
                                    : "Actions"
                                    }
                                    {
                                        checkbox.length >1 && (
                                            <button
                                            title="Delete"
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                            onClick={()=>{
                                                setConfirmationModal({
                                                    text1:"Do you want to delete these courses?",
                                                    text2:"All the data related to these courses will be deleted",
                                                    btnText1:"Delete",
                                                    btnHandler1:!loading 
                                                    ? ()=>handleSelectedCourseDelete()
                                                    : ()=>{},
                                                    btnText2:"Cancel",
                                                    btnHandler2:!loading
                                                    ? ()=>setConfirmationModal(null)
                                                    :()=>{},
                                                })
                                            }}
                                            >
                                                <RiDeleteBin6Line fontSize={20}/>
                                            </button>
                                        )
                                    }
                                </div>
                                </div>
                        </div>
                        {/* body */}
                        <div>
                            {instructorCourses.map((courseData,index)=>(
                                <div 
                                key={index}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                >
                                    <div>
                                        <input 
                                        type="checkbox"
                                        checked={checkbox.includes(courseData._id)}
                                        onChange={()=>{
                                            if(checkbox.includes(courseData._id)){
                                                setCheckbox(
                                                    checkbox.filter((id)=>id !== courseData._id)
                                                )
                                            }else{
                                                setCheckbox([...checkbox,courseData._id])
                                            }
                                        }}
                                        />
                                    </div>

                                    <div className="flex flex-1 gap-x-4 pivoted">
                                        <img 
                                        src={courseData.thumbnail} 
                                        alt={courseData.courseName} 
                                        className="h-[148px] w-[200px] rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col gap-y-2">
                                            <p className="text-lg font-semibold text-richblack-5">
                                                {courseData.courseName}
                                            </p>
                                            <p
                                            className="text-xs text-richblack-300"
                                            >{courseData.courseDescription.split(" ").length >
                                            TRUNCATE_LENGTH ? courseData.courseDescription.split(" ").slice(0,TRUNCATE_LENGTH).join(" ")+"...":courseData.courseDescription
                                            }</p>
                                            <p
                                            className="text-[12px] text-richblack-5"
                                            >Created: {formatDate(courseData.createdAt)}</p>
                                            {courseData.status === COURSE_STATUS.DRAFT ? (
                                            <p className="text-pink-50 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                                <BsClockFill className="flex h-3 w-3 items-center justify-center rounded-full" />
                                                DRAFTED
                                            </p>
                                            ) : (
                                            <p className="text-caribbeangreen-300 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                                <AiFillCheckCircle className="flex h-3 w-3 items-center justify-center rounded-full" />
                                                PUBLISHED
                                            </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:flex hidden justify-between items-center w-full max-w-[30%]">
                                        <div className="flex items-center text-richblack-5 justify-center">
                                            {duration(courseData)}
                                        </div>

                                        <div className="text-richblack-5 flex items-center justify-center">
                                            ₹{courseData.price}
                                        </div>
                                        {/* last grid */}
                                        <div className="flex items-center justify-center">
                                            <button
                                            title="Edit"
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 text-richblack-5 "
                                            disabled={loading}
                                            onClick={()=>handleEdit(courseData._id)}
                                            >
                                                <FiEdit2 fontSize={20}/>
                                            </button>

                                            <button
                                            title="Delete"
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000] text-richblack-5"
                                            onClick={()=>{
                                                setConfirmationModal({
                                                    text1:"Do you want to delete this course",
                                                    text2:"All the data related to this course will be deleted",
                                                    btnText1:"Delete",
                                                    btnText2:"Cancel",
                                                    btnHandler1:!loading
                                                    ?()=>handleCourseDelete(courseData._id)
                                                    :()=>{},
                                                    btnHandler2:!loading
                                                    ?()=>setConfirmationModal(null)
                                                    :()=>{}
                                                })
                                            }}
                                            >
                                                <RiDeleteBin6Line fontSize={20}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}

export default CourseTable;