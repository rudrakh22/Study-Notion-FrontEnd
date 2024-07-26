import {categories} from "../Services/apis";
import {apiConnector} from "../Services/apiConnector";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import Error from "./Error";
import {getCatalogPageData} from "../Services/Operations/pageAndComponentData";
import Footer from "../Components/Common/Footer";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";
import CatalogCourseCard from "../Components/Core/Catalog/CatalogCourseCard";

const Catalog=()=>{
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId]=useState(null);
    const {loading}=useSelector((state)=>state.profile);
    const [active,setActive]=useState(1);
    const getCategories=async()=>{
        const response=await apiConnector("GET",categories.CATEGORIES_API);
        const category_id=response?.data.data?.filter((category)=>category.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
        setCategoryId(category_id);
    }
    useEffect(()=>{
        getCategories();
    },[catalogName]);

    useEffect(()=>{
        const getCategoryDetails=async()=>{
            try{
                const response=await getCatalogPageData(categoryId);
                setCatalogPageData(response);
            }catch(error){
                toast.error(error.message);
            }
        }
        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])
    if(loading || !catalogPageData){
        return (
            <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
                <div className="spinner"></div>
            </div>
        )
    }
    if(!loading && !catalogPageData.success){
        return (
            <Error/>
        )
    }
    return (
        <div className="mt-14">
            <div className="box-content bg-richblack-800 px-4">
                <div className="mx-auto min-h-[260px] flex flex-col justify-center gap-4 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p className="text-richblack-300 text-sm">
                        {`Home/Catalog/`}
                        <span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span>
                    </p>
                    <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>
            
            {/* Section 1 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Courses to get you started</div>
                {/* heading */}
                <div className="py-4 flex border-b border-b-richblack-600 text-sm">
                    <p className={`px-4 py-2 ${
                        active===1 ? "border-b border-b-yellow-25 text-yellow-25":"text-richblack-25"
                    } cursor-pointer`}
                    onClick={()=>setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                    className={`px-4 py-2 ${
                        active===2 ? "border-b border-b-yellow-25 text-yellow-25":"text-richblack-25"
                    } cursor-pointer`}
                    onClick={()=>setActive(2)}
                    >
                        New
                    </p>
                </div>
                {/* course display */}
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section 2 */}

                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">
                        Top Courses in {catalogPageData?.data?.differentCategory?.name}
                    </div>
                    <div className="py-8">
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                    </div>
            </div>
            {/* section3 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">
                    Frequently Bought
                </div>
                <div className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course,index)=>(
                                <CatalogCourseCard course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog;