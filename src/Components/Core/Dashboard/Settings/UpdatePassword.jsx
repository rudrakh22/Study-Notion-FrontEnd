import {useForm} from "react-hook-form";
import IconBtn from "../../../Common/IconBtn";
import {useState} from "react";
import {useSelector} from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {changePassword} from "../../../../Services/Operations/SettingApi";
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"

const UpdatePassword=()=>{

    const {token}=useSelector((state)=>state.auth);
    const [showOldPassword,setShowOldPassword]=useState(false);
    const [showNewPassword,setShowNewPassword]=useState(false);
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm();
    const submitPasswordForm=async(data)=>{
        try{
            await changePassword(token,data);
        }catch(error){
            toast.error("Something went wrong");
        }
    }
    return (
        <div>  
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="flex my-10 flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 p-2 px-4">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div className="flex lg:flex-row flex-col gap-5 ">
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">Current Password</label>
                            <input 
                            type={showOldPassword ?"text":"password"}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter current password"
                            {...register("oldPassword",{required:true})}
                            className="form-style"
                            />
                            <span
                            onClick={()=>setShowOldPassword((prev)=>!prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >{
                                showOldPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                ):(
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                )
                            }</span>
                            {
                                errors.oldPassword && (
                                    <span
                                    className="-mt-1 text-[12px] text-yellow-50"
                                    >Please enter your current password</span>
                                )
                            }
                        </div>
                        <div className="flex relative flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassword" className="lable-style">
                                New Password
                            </label>
                            <input 
                                type={showNewPassword ? "text" : "password"} 
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter new password"
                                {...register("newPassword",{
                                    required: "New password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                    maxLength: { value: 16, message: "Password must be at most 16 characters long" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/,
                                        message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
                                    }
                                })}
                                className="form-style"
                                />
                                <span
                                onClick={()=>setShowNewPassword((prev)=>!prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                    {
                                        showNewPassword ?(
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                        ):(
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                        )
                                    }
                                </span>
                                {errors.newPassword && (
                                    <span className="text-yellow-50 -mt-1 text-[12px]">
                                        {errors.newPassword.message}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                    onClick={()=>{
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 font-semibold py-2 px-5 text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn text="Update" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword;