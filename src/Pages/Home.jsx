    import { FaArrowRight } from "react-icons/fa";
    import { Link } from "react-router-dom";
    import HighlightText from "../Components/Core/HomePage/HighlightText";
    import CTAButton from "../Components/Core/HomePage/CTAButton";
    import Banner from "../assets/Images/banner.mp4";
    import Aos from "aos";
    import { useEffect } from "react";
    import CodeBlock from "../Components/Core/HomePage/CodeBlock";
    import ExploreMore from "../Components/Core/HomePage/ExploreMore";
    import TimelineSection from "../Components/Core/HomePage/TimelineSection";
    import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
    import InstructorSection from "../Components/Core/HomePage/InstructorSection";
    import Footer from "../Components/Common/Footer";
    import ReviewSlider from "../Components/Common/ReviewSlider";
    const Home = () => {
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
        <div className="mt-5">
        {/* section1 */}
        <section className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between gap-8 text-white ">
            <Link to={"/signup"}>
            <div
                data-aos="zoom-in"
                className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none"
            >
                <div className="flex items-center gap-2 rounded-full px-10 py-[10px] transition-all duration-200 group:hover:bg-richblack-900">
                <p>Become a Instructor</p>
                <FaArrowRight />
                </div>
            </div>
            </Link>

            <div
            data-aos="fade-right"
            className="text-center text-4xl font-semibold mt-7"
            >
            Empower your Future with
            <HighlightText text={"Coding Skills"} />
            </div>

            <div
            data-aos="fade-left"
            className="mt-4 w-[80%] text-center text-lg font-bold text-richblack-300"
            >
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
            </div>

            <div className="flex gap-7 mt-8">
            <CTAButton active={true} linkTo={"/signup"}>
                Learn More
            </CTAButton>
            <CTAButton active={false} linkTo={"/signup"}>
                Book a Demo
            </CTAButton>
            </div>

            <div
            data-aos="flip-right"
            className="mx-3 my-7 shadow-blue-200 shadow-[10px_-5px_50px_-5px] rounded-md animation"
            >
            <video
                className="shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
            >
                <source src={Banner} type="video/mp4" />
            </video>
            </div>

            {/* code Section */}

            <CodeBlock
            position={"lg:flex-row"}
            heading={
                <div data-aos="fade-right" className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} />
                with our online courses
                </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctaBtn1={{
                btnText: "Try it YourSelf",
                linkTo: "/signup",
                active: true,
            }}
            ctaBtn2={{
                btnText: "Learn more",
                linkTo: "/login",
                active: false,
            }}
            codeblocks={`<!DOCTYPE html>
                <html>
                <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                </head>
                <body>
                <h1><a href="/">Header</a>
                </h1>
                <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                </nav>`}
            codeColor={"text-yellow-25"}
            codeblockName={"codeblock1"}
            />

            <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
                <div data-aos="fade-left" className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
                </div>
            }
            subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctaBtn1={{
                btnText: "Continue Lesson",
                linkTo: "/login",
                active: true,
            }}
            ctaBtn2={{
                btnText: "Learn more",
                linkTo: "/login",
                active: false,
            }}
            codeblocks={`<!DOCTYPE html>
                <html>
                <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                </head>
                <body>
                <h1><a href="/">Header</a>
                </h1>
                <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                </nav>`}
            codeColor={"text-richblack-5"}
            codeblockName={"codeblock2"}
            />
            <ExploreMore/>
        </section>
        {/* section2 */}
        <div className="bg-pure-greys-5 text-richblack-700">
            <div className="homepage_bg h-[320px]">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                    <div className="lg:h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white lg:mt-8">
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className="flex flex-row items-center gap-3">
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/signup"}>
                            <div>Learn More</div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-8">
                    <div className="text-4xl font-semibold lg:w-[45%]">
                        Get the Skills you need for a 
                        <HighlightText text={"Job that is in demand"} />
                    </div>
                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px] ">
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkTo={"/signup"}>Learn more</CTAButton>
                    </div>
                </div>
                <TimelineSection/>
                <LearningLanguageSection/>
            </div>
        </div>
        {/* section3 */}
        <div className="relative mx-auto my-20 flex w-11//12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            <InstructorSection/>
            <h2 className="text-center text-4xl font-semibold mt-8">Reviews from Other Learners</h2>
            <ReviewSlider />
        </div>
        {/* Footer */}
        <Footer/>
        </div>
    );
    };

    export default Home;
