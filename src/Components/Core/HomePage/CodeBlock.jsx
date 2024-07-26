    import CTAButton from "./CTAButton";
    import { FaArrowRight } from "react-icons/fa";
    import { TypeAnimation } from "react-type-animation";
    import { useEffect } from "react";
    import Aos from "aos";
    import "aos/dist/aos.css";
    const CodeBlock = ({
    position,
    heading,
    subheading,
    ctaBtn1,
    ctaBtn2,
    codeblocks,
    codeblockName,
    codeColor,
    }) => {
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
        <div className={`flex flex-col ${position} my-20 justify-between gap-10`}>
        {/* section 1 */}
        <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
            {heading}
            <div className="text-richblack-300 font-bold w-[85%]">{subheading}</div>
            <div className="flex gap-7 mt-7">
            <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
                <div className="flex gap-2 items-center">
                {ctaBtn1.btnText}
                <FaArrowRight />
                </div>
            </CTAButton>
            <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
                {ctaBtn2.btnText}
            </CTAButton>
            </div>
        </div>

        {/* section2 */}
        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
            <div className={`${codeblockName} absolute`}></div>
            <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>8</p>
            <p>10</p>
            <p>11</p>
            </div>

            <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
            >
            <TypeAnimation
                sequence={[codeblocks, 10000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                whiteSpace: "pre-line",
                display: "block",
                }}
            />
            </div>
        </div>
        </div>
    );
    };

    export default CodeBlock;
