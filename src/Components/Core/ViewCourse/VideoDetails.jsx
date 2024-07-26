import {useEffect,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import IconBtn from "../../Common/IconBtn";
import {useRef} from "react";
import {useNavigate,useLocation,useParams} from "react-router-dom";
import {markLectureAsCompleted} from "../../../Services/Operations/courseDetailsApi";
import {updateCompletedLectures} from "../../../slices/viewCourseSlice";
import {Player,BigPlayButton} from "video-react";
const VideoDetails=()=>{
    const {courseID,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const location=useLocation();
    const playerRef=useRef(null);
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const [videoData,setVideoData]=useState([])
    const [previewSource,setPreviewSource]=useState("");
    const [videoEnded,setVideoEnded]=useState(false);
    const [loading,setLoading]=useState(false);
    const {courseEntireData,courseSectionData,completedLectures}=useSelector((state)=>state.viewCourse);
    useEffect(()=>{
        ;(async()=>{
            if(!courseSectionData.length) return;
            if(!courseSectionData || !courseEntireData || !completedLectures){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                const filteredData=courseSectionData.filter((course)=>course._id===sectionId);
                const filteredVideoData=filteredData?.[0]?.subSection.filter((data)=>data._id===subSectionId);
                setVideoData(filteredVideoData[0]);
            }
        })()
    },[courseEntireData,courseSectionData,location.pathname])

    const isFirstVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((section)=>section._id===sectionId);
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId);
        if(currentSectionIndex===0 && currentSubSectionIndex===0){
            return true;
        }
        else{
            return false;
        }
    }
    const goToNextVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((section)=>section._id===sectionId);
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId);
        const noOfSubSections=courseSectionData?.[currentSectionIndex].subSection?.length;
        if(currentSubSectionIndex !== noOfSubSections-1){
            const nextSubSectionId=courseSectionData?.[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
            navigate(`/view-course/${courseID}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            const nextSectionId=courseSectionData?.[currentSectionIndex+1]._id;
            const nextSubSectionId=courseSectionData?.[currentSectionIndex+1].subSection[0]._id;
            navigate(`/view-course/${courseID}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }
    const isLastVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((section)=>section._id===sectionId);
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId);
        const noOfSubSections=courseSectionData?.[currentSectionIndex].subSection?.length;
        if(currentSectionIndex=== courseSectionData.length-1 && currentSubSectionIndex===noOfSubSections-1){
            return true;
        }else{
            return false;
        }
    }

    const goToPrevVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((section)=>section._id===sectionId);
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId);
        if(currentSubSectionIndex !==0){
            const prevSubSectionId=courseSectionData?.[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseID}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            const prevSectionId=courseSectionData?.[currentSectionIndex-1]._id;
            const prevSubSectionLength=courseSectionData?.[currentSectionIndex-1].subSection.length;
            const prevSubSectionId=courseSectionData?.[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
            navigate(`/view-course/${courseID}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    const handleLectureCompletion=async()=>{
        setLoading(true);
        const res=await markLectureAsCompleted({courseId:courseID,subSectionId:subSectionId },token);
        if(res){
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    }
    return (
        <div className="flex flex-col gap-5 text-white ">
            {!videoData ? (
                <img 
                src={previewSource} 
                alt="Preview" />
            )
            : (
                <Player
                    playsInline
                    src={videoData?.videoUrl}
                    aspectRatio="16:9"
                    onEnded={()=>setVideoEnded(true)}
                    ref={playerRef}
                >
                    <BigPlayButton position="center"/>
                    {videoEnded && (
                        <div
                        style={{
                            backgroundImage:
                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            }}
                        className="w-full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                        >
                            <div className="flex space-x-5">
                            {!completedLectures.includes(subSectionId) && (
                                <IconBtn
                                    disabled={loading}
                                    onclick={()=>handleLectureCompletion()}
                                    text={!loading ? "Mark As Completed" : "Loading..."}
                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                />
                            )}
                            <IconBtn
                                disabled={loading}
                                onclick={()=>{
                                    if(playerRef?.current){
                                        playerRef?.current?.seek(0);
                                        setVideoEnded(false);
                                    }
                                }}
                                text="Replay"
                                customClasses="text-xl max-w-max px-4 mx-auto"
                            />
                            </div>
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {!isFirstVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                    className="blackButton"
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className="blackButton"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}
            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails;