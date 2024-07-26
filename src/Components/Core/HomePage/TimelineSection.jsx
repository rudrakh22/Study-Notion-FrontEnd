    import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
    import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
    import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
    import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
    import timeLineImage from "../../../assets/Images/TimelineImage.png";
    import Aos from "aos";
    import { useEffect } from "react";

    const TimelineSection = () => {
    const timeLine = [
        {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
        },
        {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
        },
        {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
        },
        {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
        },
    ];
    useEffect(() => {
        Aos.init({
        duration: 1000,
        easing: "ease",
        once: true,
        mirror: false,
        delay: 100,
        offset: 0,
        });
    }, []);
    return (
        <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-20">
            <div data-aos="fade-right"className="flex flex-col lg:w-[45%] gap-14 lg:gap-3">
                {timeLine.map((element, index) => (
                <div className="flex flex-col lg:gap-3" key={index}>
                    <div className="flex gap-6">
                        <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                            <img src={element.Logo} alt="logo" loading="lazy"/>
                        </div>
                        <div>
                            <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                            <p className="text-base">{element.Description}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>

            {/* Image */}
            <div data-aos="zoom-out" className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
            <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10">
                <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                    <p className="text-3xl font-bold w-[75px]">10</p>
                    <p className="text-caribbeangreen-300 text-sm w-[75px]">
                        Years of Experience
                    </p>
                </div>
                <div className="flex gap-5 items-center lg:px-14 px-7">
                    <p className="text-3xl font-bold w-[75px]">250</p>
                    <p className="text-caribbeangreen-300 text-sm w-[75px]">
                        Types of Courses
                    </p>
                </div>
            </div>
            <img
                src={timeLineImage}
                alt="timeLineImage"
                className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                loading="lazy"
            />
            </div>
        </div>
        </div>
    );
    };

    export default TimelineSection;
