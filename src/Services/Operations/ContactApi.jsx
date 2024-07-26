import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {contactUsEndpoint} from "../apis";  

const {CONTACT_US_API}=contactUsEndpoint;

export async function contactUsForm(countryCode,email,firstName,lastName,message,phoneNumber){
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",CONTACT_US_API,{
            countryCode,
            email,
            firstName,
            lastName,
            message,
            phoneNumber
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Message sent successfully");
    }catch(error){
        toast.error(error?.response?.data?.message||"Message did not received");
    }
    toast.dismiss(toastId);
}