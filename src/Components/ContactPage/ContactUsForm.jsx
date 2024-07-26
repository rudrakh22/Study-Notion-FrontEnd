import {useForm} from "react-hook-form";
import CountryCode from "../../data/countrycode.json"
import {contactUsForm} from "../../Services/Operations/ContactApi";
import {useState,useEffect} from "react"


const ContactUsForm = () => {

    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful},
    }=useForm();

    const submitContactForm=async(data)=>{
        const {countryCode,email,firstName,lastName,message,phoneNumber}=data;
        setLoading(true);
        await contactUsForm(
            countryCode,
            email,
            firstName,
            lastName,
            message,
            phoneNumber,
        );
        setLoading(false);
    }

    useEffect(()=>{
        if(loading===false){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",
            })
        }
    },[reset,isSubmitSuccessful,loading])
    return (
        <form 
        onSubmit={handleSubmit(submitContactForm)}
        className="flex flex-col gap-7"
        >
        <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstName" className="label-style">
                    First Name <sup className="text-pink-400">*</sup>
                </label>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    id="firstName"
                    {...register("firstName",{required:true})}
                    className="form-style"
                />
                    {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your First name.
                        </span>
                    )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName">
                    Last Name <sup className="text-pink-400">*</sup>
                </label>
                <input 
                    type="text" 
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    {...register("lastName")}
                    className="form-style"
                />
            </div>  
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-style">
                Email<sup className="text-pink-400">*</sup>
            </label>
            <input 
            type="text" 
            id="email"
            name="email"
            placeholder="Enter email address"
            {...register("email",{required:true})}
            className="form-style"
            />
            {
                errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your email address.
                    </span> 
                )}
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="label-style">
                Phone Number<sup className="text-pink-400">*</sup>
            </label>

            <div className="flex gap-5">
                <div className="flex flex-col gap-2 w-[81px]">
                    <select 
                    name="dropdown" 
                    id="dropdown"
                    {...register("countryCode",{required:true})}
                    className="form-style"
                    >
                        {CountryCode.map((element,index)=>{
                            return (
                                <option key={index} value={element.code}>
                                    {element.code} -{element.country}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input 
                    type="tel" 
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="12345 67890"
                    className="form-style"
                    {...register("phoneNumber",{
                        required:{
                            value:true,
                            message:"Please enter your phone number"
                        },
                        maxLength:{value:11,message:"Invalid phone number"},
                        minLength:{value:8,message:"Invalid phone number"}
                    })}
                    />
                </div>
            </div>
            {errors.phoneNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNumber.message}
                </span>
            )}
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-style">
                Message<sup className="text-pink-400">*</sup>
            </label>
            <textarea 
            name="message" 
            id="message" 
            cols="30" 
            rows="7"
            placeholder="Enter Your Message Here..."
            {...register("message",{required:true})}
            className="form-style"
            />
            {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your message.
                </span>
            )}
        </div>

        <button
        type="submit"
        className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
            transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] "
        >
            {loading ? "Sending...":"Send Message"}
        </button>
        </form>
    )
};

export default ContactUsForm;
