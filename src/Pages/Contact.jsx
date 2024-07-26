import Footer from "../Components/Common/Footer";
import InfoSection from "../Components/ContactPage/InfoSection";
import ContactFormSection from "../Components/ContactPage/ContactFormSection";
import ReviewSlider from "../Components/Common/ReviewSlider";


const Contact=()=>{
    return (
        <div className="mt-14">
            {/* section 1 */}
            <section className="mx-auto mt-20 flex flex-col  justify-between gap-10 max-w-maxContent text-white lg:flex-row w-11/12">
                <InfoSection/>
                <ContactFormSection/>
            </section>

            {/* section 2 */}
            <section className="relative flex flex-col items-center justify-center w-full  bg-richblack-900 text-white my-20">
                <h1 className="text-4xl text-center font-semibold mt-8">Reviews from other learner</h1>
                <ReviewSlider />
            </section>

            {/* section 3 */}
            <section>
                <Footer/>
            </section>
        </div>
    )
}

export default Contact;