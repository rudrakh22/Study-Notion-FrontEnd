import HighLightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTABtn from "./CTAButton";

const LearningLanguageSection=()=>{
    return (
        <div>
            <div className="text-4xl font-semibold text-center my-10">
                Your Swiss Knife for
                <HighLightText text={"learning any language"}/>

                <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
                Using spin making learning multiple languages easy. with 20+ languages
                realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
                    <img 
                    src={know_your_progress} 
                    alt="KnowYourProgress" 
                    className="object-contain lg:-mr-32 "
                    loading="lazy"
                    />
                    <img 
                    src={compare_with_others} 
                    alt="KnowYourProgress" 
                    className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                    loading="lazy"/>
                    <img 
                    src={plan_your_lesson} 
                    alt="KnowYourProgress" 
                    className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
                    loading="lazy"/>

                </div>
            </div>

            <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
                <CTABtn active={true} linkTo={"/signup"}>
                    <div>Learn more</div>
                </CTABtn>
            </div>
        </div>
    )
}

export default LearningLanguageSection;
