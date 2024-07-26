import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../Services/Operations/AuthApi";
import {useNavigate} from "react-router-dom";
import {VscSignOut} from "react-icons/vsc";
import {useSelector,useDispatch} from "react-redux"
import {useState} from "react";
import SidebarLinks from "./SidebarLinks";
import ConfirmationModal from "../../Common/ConfirmationModal";


const Sidebar=()=>{
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmationModal,setConfirmationModal]=useState(null);

    if(profileLoading && authLoading){
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="hidden lg:flex min-w-[220px] flex-col border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] py-10 bg-richblack-800">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link,index)=>{
                            if(link.type && user?.accountType !==link.type){
                                return null;
                            }
                            return (
                                <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                            )
                        })}
                </div>

                <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700"></div>

                {/* setting and logout */}

                <div className="flex flex-col">
                    <SidebarLinks link={{name:"Settings",path:"/dashboard/settings"}} iconName="VscSettingsGear"
                    />

                    <button
                    onClick={()=>{ setConfirmationModal({
                        text1:"Are you sure?",
                        text2:"You will be logged out of your account",
                        btnText1:"Logout",
                        btnHandler1:()=>dispatch(logout(navigate)),
                        btnText2:"Cancel",
                        btnHandler2:()=>setConfirmationModal(null)
                        })}} 
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg"/>
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar;