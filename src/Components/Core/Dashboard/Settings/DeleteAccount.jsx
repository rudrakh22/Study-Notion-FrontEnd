import {deleteAccount} from "../../../../Services/Operations/SettingApi";
import {useSelector,useDispatch} from "react-redux";
import {FiTrash2} from "react-icons/fi"
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useState} from "react";
import IconBtn from "../../../Common/IconBtn";
const DeleteAccount = () => {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [modal,setModal]=useState(false);

    async function handleDeleteAccount(){
        try{
            dispatch(deleteAccount(token,navigate));
        }catch(error){
            toast.error(error.message);
        }
    }
    return (
        <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 sm:p-8 sm:px-12 p-2 px-4">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-3xl text-pink-200"/>
            </div>
            <div className="flex flex-col space-y-2 ">
                <h2 className="text-lg font-semibold text-richblack-5">Delete Account</h2>
                <div className="w-3/5 text-pink-25">
                    <p>Would you like to delete account?</p>
                    <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                </div>
                <button
                className="w-fit cursor-pointe bg-pink-800 px-5 py-3 rounded-lg text-richblack-5 font-semibold border-[1px] border-pink-700"
                onClick={()=>setModal(true)}
                >
                    I want to delete my Account
                </button>
            </div>
            {
                modal && (
                    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                        <div className="w-11/12 max-w-[350px] rounded-lg border-richblack-400 bg-richblack-800 p-6">
                            <p className="text-2xl font-semibold text-richblack-5">Are you Sure</p>
                            <p className="mt-3 mb-5 leading-6 text-richblack-200">Your account wil be deleted</p>
                            <div className="flex  items-center gap-x-4">
                                <IconBtn
                                text="Delete"
                                onclick={handleDeleteAccount}
                                />
                                <button
                                className="rounded-md bg-richblack-200 cursor-pointer py-[8px] px-[20px] font-semibold text-richblack-900"
                                onClick={()=>setModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default DeleteAccount;