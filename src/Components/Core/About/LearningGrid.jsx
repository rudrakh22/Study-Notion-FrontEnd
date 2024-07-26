import CTAButton from "../HomePage/CTAButton";
import HighlightText from "../HomePage/HighlightText";


const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
        "Save time and money! The structured curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];
const LearningGrid =()=>{
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 w-[350px] xl:w-fit mb-12 mx-auto">
            {
                LearningGridArray.map((card,index)=>(
                    <div
                    key={index}
                    className={`${index===0 && "xl:col-span-2"}
                    ${
                        card.order % 2===0 ?
                        "bg-richblack-800":
                        "bg-richblack-700"
                    }
                    ${card.order===3 && "lg:col-start-2"}
                    ${card.order < 0 && "bg-transparent xl:h-[294px]"}
                    ${card.order > 0  && "h-[294px]"}
                    `}
                    >
                        {
                            card.order <0 ? (
                                <div className="w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                    <div className="text-4xl font-semibold">
                                        {card.heading}
                                    <br />
                                    <HighlightText text={card.highlightText}/>
                                    </div>
                                    <p className="text-richblack-300 font-medium">{card.description}
                                    </p>
                                    <div className="w-fit mt-2">
                                        <CTAButton active={true} linkTo={card.BtnLink}>
                                            {card.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            ):(
                                <div className="p-8 flex flex-col gap-8">
                                    <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                                    <p className="text-richblack-300 font-medium">{card.description}</p>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LearningGrid;