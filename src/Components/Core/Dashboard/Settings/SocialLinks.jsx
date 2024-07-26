import {useState} from "react";
import IconBtn from "../../../Common/IconBtn";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {useForm} from "react-hook-form"
import {FaGlobe,FaInstagram,FaTwitter,FaLinkedin,FaEdit} from "react-icons/fa";
import * as Icons from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux";
import "react-tooltip/dist/react-tooltip.css"
import {Tooltip as ReactTooltip} from "react-tooltip";
import {toast} from "react-hot-toast";
import {
    createSocial,
    deleteSocial,
    updateSocial,
} from "../../../../Services/Operations/SettingApi"
import {RiDeleteBin6Line} from "react-icons/ri";


const SocialLinks=()=>{
    const [addModal,setAddModal]=useState(null);
    const [addForm,setAddForm]=useState(null);
    const [editSocials,setEditSocials]=useState(false);
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    }=useForm();

    const onSubmit=async(data)=>{
        let result;
        if(editSocials){
            result=dispatch(updateSocial({
                socialId:editSocials,
                platform:data.platform,
                link:data.link
            },
            token))
        }else{
            result=dispatch(createSocial(token,data));
        }
        if(result){
            setEditSocials(null);
            setAddForm(null);
            setValue("platform","");
            setValue("link","");
        }
    }

    const cancelEdit=()=>{
        setEditSocials(false);
        setAddForm(false);
    }

    const handleEdit=(id,platformName,link)=>{
        if(editSocials === id){
            cancelEdit();
            return;
        }
        setAddForm(true);
        setEditSocials(id);
        setValue("platform",platformName);
        setValue("link",link);
    }

    const handleDelete=(socialId)=>{
        if(socialId){
            dispatch(deleteSocial(token,{socialId:socialId}));
        }
    }

    const handleModalClick=(platformName)=>{
        if(user?.socials.length>0){
            const filterPlatform=user?.socials?.filter((social)=> social.name===platformName)
        
        if(filterPlatform.length>0){
            return toast.error(`Cannot add more than one ${platformName} link`)
        }
    }
    setAddForm(true);
    setAddModal(null);
    setValue("platform",platformName);
    }

    return (
        <div className="my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 p-2 px-4">
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">Add Social Media Links</p>
                <IconBtn text="Add" onclick={()=>{setAddModal(true)}}>
                <AiOutlinePlusCircle className="font-bold"/>
                </IconBtn>
            </div>

            {addForm && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="relative flex flex-col gap-2 lg:w-[48%]">
                                <label 
                                htmlFor="platform"
                                className="lable-style"
                                >
                                    Social Media Platform
                                </label>
                                <input 
                                type="text" 
                                name="platform"
                                id="platform"
                                placeholder="Enter social media platform"
                                {...register("platform",{required:true})}
                                readOnly
                                className="form-style"
                                />
                                {errors.platform && (
                                    <span className="text-yellow-50 text-[12px] -mt-1">
                                        Please enter your Social Media Platform
                                    </span>
                                )}
                            </div>
                            <div className="relative flex flex-col gap-2 lg:w-[48%]">
                                <label 
                                htmlFor="link"
                                className="lable-style"
                                >
                                    Link
                                </label>
                                <input 
                                type="url" 
                                name="link"
                                id="link"
                                placeholder="Enter social media link"
                                {...register("link",{required:true})}
                                className="form-style"
                                />
                                {errors.link && (
                                    <span className="text-yellow-50 text-[12px] -mt-1">
                                        Please enter your Social Media link
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                                <button
                                onClick={cancelEdit}
                                className="cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50"
                                >
                                    Cancel
                                </button>
                            <IconBtn
                            type="submit"
                            text={editSocials ? "Update": "Save"}
                            />
                        </div>
                    </div>
                </form> 
            )}

            {
            user?.socials?.length >0 && 
            (
                <div className="flex flex-col gap-y-2 mb-5">
                    <div className="flex flex-row justify-between mb-5">
                        <div className="text-richblack-300 uppercase font-medium text-lg">Name</div>
                        <div className="text-richblack-300 uppercase font-medium text-lg">Link</div>
                        <div className="text-richblack-300 uppercase font-medium text-lg">Action</div>
                    </div>
                    <div className="flex flex-col gap-y-6">
                        {
                            user?.socials?.map((social,index)=>{
                                const iconName=social.name==="Website" ? "FaGlobe":`Fa${social.name}`
                                const Icon =Icons[iconName];
                                return (
                                    <div className="flex flex-row items-center justify-between" key={index}>
                                        <div>
                                            <Icon className="text-base sm:text-3xl text-richblack-5"/>
                                        </div>
                                        <div className="text-sm sm:text-base font-medium text-richblack-100 sm:mb-0 mb-5">{social.link}</div>
                                        <div className="flex text-sm sm:text-base font-medium uppercase text-richblack-100 sm:mb-0 mb-5">
                                            <button
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            onClick={()=>handleEdit(social._id,social.name,social.link)}
                                            >
                                                <FaEdit fontSize={20}/>
                                            </button>
                                            <button
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                            onClick={()=>handleDelete(social._id)}
                                            >
                                                <RiDeleteBin6Line fontSize={20}/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
            {addModal && (
                <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className="w-11/12 max-w-[350px] rounded-lg border-richblack-400 bg-richblack-800 p-6">
                        <div className="flex flex-wrap gap-7 items-center justify-center mb-5 p-5">
                            <button
                            data-tooltip-id="website"
                            className="hover:scale-125 transition-all duration-500"
                            onClick={()=>{
                                handleModalClick("Website")
                            }}
                            >
                                <FaGlobe className="text-3xl hover:text-caribbeangreen-200 text-richblack-400"/>
                            </button>
                            <ReactTooltip
                                id="website"
                                place="top"
                                content="Website"
                                variant="success"
                                style={{
                                    backgroundColor: "#05BF8E",
                                    color: "rgb(256,256,256)",
                            }}
                            />

                            <button
                            data-tooltip-id="twitter"
                            className="hover:scale-125 transition-all duration-500"
                            onClick={()=>{
                                handleModalClick("Twitter")
                            }}
                            >
                                <FaTwitter className="text-3xl hover:text-[#00acee] text-richblack-400"/>
                            </button>
                            <ReactTooltip
                                id="twitter"
                                place="top"
                                content="Twitter"
                                variant="info"
                            />

                            <button
                            data-tooltip-id="instagram"
                            className="hover:scale-125 transition-all duration-500"
                            onClick={()=>{
                                handleModalClick("Instagram")
                            }}
                            >
                                <FaInstagram className="text-3xl hover:text-[#E4405F] text-richblack-400"/>
                            </button>
                            <ReactTooltip
                                id="instagram"
                                place="top"
                                content="Instagram"
                                variant="error"
                                style={{backgroundColor: "#E4405F"}}
                            />

                            <button
                            data-tooltip-id="linkedin"
                            className="hover:scale-125 transition-all duration-500"
                            onClick={()=>{handleModalClick("Linkedin")}}
                            >
                                <FaLinkedin className="text-3xl hover:text-blue-200 text-richblack-400"/>
                            </button>
                            <ReactTooltip
                                id="linkedin"
                                place="bottom"
                                content="Linkedin"
                                variant="info"
                            />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <button
                            onClick={()=>{setAddModal(null)}}
                            className="rounded-md bg-richblack-200 cursor-pointer py-[8px] px-[20px] font-semibold text-richblack-900"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SocialLinks;