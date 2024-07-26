import ChangeProfile from "./ChangeProfile";
import EditProfile from "./EditProfile";
import SocialLinks from "./SocialLinks";
import {useSelector} from "react-redux"
import {ACCOUNT_TYPE } from "../../../../utils/constants";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
export default function Settings(){
    const {user}=useSelector((state)=>state.profile);
    return  (
        <div >
            <h1 className="mb-14 text-richblack-5 font-medium text-3xl">Edit Profile</h1>
            <ChangeProfile/>
            <EditProfile />
            {user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                <SocialLinks/>
            )}
            <UpdatePassword/>
            <DeleteAccount/>
        </div>
    )
}

