    import HighlightText from "./HighlightText";
    import CTABtn from "./CTAButton";
    import { FaArrowRight } from "react-icons/fa";
    import Instructor from "../../../assets/Images/Instructor.png";

    const InstructorSection = () => {
    return (
        <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-[50%]">
            <img
                src={Instructor}
                alt="Instructor"
                loading="lazy"
                className="shadow-[-20px_-20px_0px_0px] shadow-white"
            />
            </div>

            <div className="flex flex-col gap-10 lg:w-[50%]">
            <div className="lg:w-[50%] text-4xl font-semibold">
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                Instructors from around the world teach millions of students on
                StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className="w-fit">
                <CTABtn active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                    Start Learning Today
                    <FaArrowRight />
                </div>
                </CTABtn>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default InstructorSection;
