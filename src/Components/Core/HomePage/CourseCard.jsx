    import { HiUsers } from "react-icons/hi";
    import { ImTree } from "react-icons/im";

    const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    const { heading, description, lessonNumber, level } = cardData;
    return (
        <div
        className={`w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer
        ${
            currentCard === heading
            ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50  text-richblack-25"
            : "bg-richblack-800  text-richblack-25"
        } transition-all duration-200 hover:bg-richblack-5 hover:text-richblue-500 hover:shadow-[12px_12px_0_0] hover:shadow-yellow-50 group hover:scale-105`}
        onClick={() => setCurrentCard(heading)}
        >
        <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
            <div
            className={` ${
                currentCard === heading ? "text-richblack-800" : "text-richblack-25"
            }  font-semibold text-[20px] transition-all duration-200 ease-in group-hover:text-richblack-800`}
            >
            {heading}
            </div>
            <div className="text-richblack-400">{description}</div>
        </div>

        <div className="flex justify-between text-blue-300 px-6 py-3 font-medium">
            <div className="flex items-center gap-2 text-[16px]">
            <HiUsers/>
            <p>{level}</p>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
            <ImTree/>
            <p>{lessonNumber} Lesson</p>
            </div>
        </div>
        </div>
    );
    };

    export default CourseCard;