import {useForm} from "react-hook-form";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import {toast} from "react-hot-toast";
import {updateProfile} from "../../../../Services/Operations/SettingApi";

const EditProfile=()=>{

    const {register,handleSubmit,formState:{errors}}=useForm();
    const {token} =useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const gender=[
        "Male",
        "Female",
        "Mon binary",
        "Prefer not to say",
        "Other"
    ];
    const submitProfileForm=async(data)=>{
        try{
            dispatch(updateProfile(token,data))
        }catch(error){
            toast.error("Error while updating profile")
        }
    }
    return (
        <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 p-2 px-4">
                <h2 className="text-richblack-5 text-lg font-semibold">Profile Information</h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="lable-style">First Name</label>
                        <input 
                        type="text" 
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName}
                        className="form-style"
                        />
                        {
                            errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName" className="lable-style">Last Name</label>
                        <input 
                        type="text" 
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        {...register("lastName",{required:true})}
                        defaultValue={user?.lastName}
                        className="form-style"
                        />
                        {
                            errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-5 lg:flex-row ">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="lable-style">Date of birth</label>
                            <input 
                            type="date" 
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Enter date of birth"
                            {...register("dateOfBirth",{required:{
                                value:true,
                                message:"Please enter your date of birth"
                            },
                            max:{
                                value:new Date().toISOString().split("T")[0],
                                message:"Date of birth cannot be in the future"
                            },
                        })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                            className="form-style"
                            />
                            {
                                errors.dateOfBirth && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.dateOfBirth.message}
                                    </span>
                                )
                            }
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">Gender</label>
                            <select 
                            name="gender" 
                            id="gender"

                            className="form-style"
                            {...register("gender",{required:true})}
                            >
                                {
                                    gender.map((element,index)=>(
                                        <option key={index} value={element}>
                                            {element}
                                        </option>
                                    ))
                                }
                            </select>
                            {
                                errors.gender && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your gender
                                    </span>
                                )
                            }
                    </div>
                </div>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="phoneNumber" className="lable-style">Phone Number</label>
                            <input 
                            type="text" 
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter contact number"
                            defaultValue={user?.additionalDetails?.contactNumber}
                            className="form-style"
                            {...register("contactNumber",{required:{
                                value:true,
                                message:"Please enter your phone number"
                            },
                            maxLength:{value:12,message:"Invalid phone number"},
                            minLength:{value:8,message:"Invalid phone number"}
                        })}
                            />
                            {
                                errors.contactNumber && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.contactNumber.message}
                                    </span>
                                )
                            }
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">About</label>
                            <input 
                            type="text" 
                            name="about"
                            id="about"
                            placeholder="Enter bio details..."
                            defaultValue={user?.additionalDetails?.about}
                            className="form-style"
                            {...register("about",{required:true })}
                            />
                            {
                                errors.about && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your about.
                                    </span>
                                )
                            }
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                onClick={()=>{navigate("/dashboard/my-profile")}}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >Cancel</button>
                <IconBtn type="submit" text="Save"/>
            </div>
        </form>
    )
}

export default EditProfile;