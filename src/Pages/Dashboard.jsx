import {useState} from "react";
import {Outlet} from "react-router-dom"
import {useSelector} from "react-redux";
import Sidebar from "../Components/Core/Dashboard/Sidebar";

const Dashboard=()=>{
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(profileLoading || authLoading){
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] relative">
            <Sidebar/>
            <div className="grid h-[calc(100vh-3.5rem)] overflow-auto flex-1">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;