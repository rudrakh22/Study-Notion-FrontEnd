import {useSelector} from "react-redux";
import {Link,useNavigate} from "react-router-dom"
import IconBtn from "../../Common/IconBtn";
import {RiEditBoxLine} from "react-icons/ri";
import {formattedDate} from "../../../utils/dateFormatter";
import {ACCOUNT_TYPE} from "../../../utils/constants";
import {AiOutlinePlusCircle} from "react-icons/ai";
const MyProfile=()=>{

    const {user} =useSelector((state)=>state.profile)

    const navigate=useNavigate();
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>
            {/* section 1 */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 sm:flex-row flex-col-reverse gap-y-8">
                {/* left part */}
                <div className="flex items-center gap-x-4 flex-col sm:flex-row">
                    <Link to={`/instructor/${user._id}`}>
                        <img 
                        src={user?.image} 
                        className="aspect-square rounded-full object-cover w-[78px]" 
                        alt={`profile-${user?.firstName}`} />
                    </Link>

                    <div className="space-y-1">
                        <Link to={`/instructor/${user?.id}`}>
                            <p className="text-sm sm:text-lg text-center sm:text-left font-semibold text-richblack-5 hover:text-caribbeangreen-300">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                        </Link>

                        <p className="text-sm sm:text-lg font-semibold text-richblack-5 text-center sm:text-left">
                            {user?.email}
                        </p>
                    </div>
                </div>
                {/* right button */}
                <IconBtn
                text="Edit"
                onclick={()=>{navigate("/dashboard/settings")}}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            {/* section 2 */}

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                {/* left part */}
                <div className="flex w-full items-center justify-between gap-4 flex-col-reverse sm:flex-row">
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    
                    <IconBtn
                        text="Edit"
                        onclick={()=>{navigate("/dashboard/settings")}}
                    >
                        <RiEditBoxLine/>
                    </IconBtn>
                </div>
                <p
                className="text-sm text-richblack-400 font-medium"
                >{user?.additionalDetails?.about || "Write Something about yourself"}</p>

                <p className="text-lg text-richblack-5">
                    Account Type :  {" "}
                    <span className="font-semibold">{user?.accountType}</span>
                </p>
            </div>

            {/* section 3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                    <IconBtn
                        text="Edit"
                        onclick={()=>{navigate("/dashboard/settings")}}
                    >
                        <RiEditBoxLine/>
                    </IconBtn>
                </div>

                <div className="flex max-w-[500px] justify-between flex-col sm:flex-row">
                    {/* left part */}
                    <div className="flex flex-col gap-y-5">
                        {/* first Name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                        </div>
                        {/* Email */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                        </div>
                        {/* gender */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add gender"}</p>
                        </div>
                    </div>

                    {/* right part */}
                    <div className="flex flex-col gap-y-5">
                        {/* last Name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                        </div>
                        {/* contact number */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber?? "Add contact number"}</p>
                        </div>
                        {/* date of birth */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add date of birth"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
                (
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:px-12 px-2 py-2">
                    {/* Left Part */}
                    <div className="flex w-full items-center justify-between mt-6">
                        <p className="text-lg font-semibold text-richblack-5">Social Media Details</p>
                        <IconBtn
                        text={user?.socials.length >0 ? "Edits":"Add"}
                        onclick={()=>{navigate("/dashboard/settings")}}
                        >
                        {user?.socials.length > 0 ? (
                            <RiEditBoxLine/>
                        ):(
                            <AiOutlinePlusCircle/>
                        )}
                    </IconBtn>
                    </div>
                    {/* Social Links */}
                    
                    <div className="flex flex-col max-w-[500px] p-6 gap-y-6 w-maxContent">
                        <div className="flex items-center justify-between ">
                            <p className="text-sm text-richblack-600 text-center">Platform</p>
                            <p className="text-sm text-richblack-600 text-center">Links</p>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            {user?.socials.map((social,index)=>(
                                
                                <div className="flex items-center justify-between gap-x-6" key={index}>
                                    <p className="text-sm font-medium text-richblack-5">{social.name}</p>
                                    <p className="text-sm font-medium text-richblack-5">{social.link}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyProfile;