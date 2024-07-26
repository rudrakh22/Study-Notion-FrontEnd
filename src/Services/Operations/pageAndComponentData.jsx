import {toast} from "react-hot-toast";
import {catalogData} from "../apis";
import {apiConnector} from "../apiConnector";
export const getCatalogPageData=async(categoryId)=>{
    const toastId=toast.loading("Loading...");
    let result=[]
    try{
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{
            categoryId:categoryId
        })
        if (!response.data.success){
            throw new Error(response.data.message);
        }
        result=response?.data;
    }catch(error){
        result=error.response?.data;
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}