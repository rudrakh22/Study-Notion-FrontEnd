import ContactUsForm from "./ContactUsForm"

const ContactFormSection =()=>{
    return (
        <div className="lg:w-[60%]">
            <div className="flex flex-col border border-richblack-300 rounded-xl p-7 lg:p-14 gap-3">
                <h1 className="text-4xl font-semibold leading-10 text-richblack-5">
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                <p className="text-richblack-300 mt-3">Tell us more about yourself and what you're got in mind.</p>
                <div className="mt-7">
                    <ContactUsForm/>
                </div>
            </div>
        </div>
    )
}

export default ContactFormSection;