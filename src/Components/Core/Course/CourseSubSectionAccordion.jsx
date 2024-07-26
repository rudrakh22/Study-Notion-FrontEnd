import { HiOutlineVideoCamera } from "react-icons/hi"
import {convertSecondsToDuration} from "../../../utils/secToDuration";
const CourseSubSectionAccordion=({subSec})=>{
    return (
        <div>
            <div className="flex justify-between py-2">
                <div className={`flex items-center gap-2 lg:space-x-3`}>
                    <span className="text-white">
                        <HiOutlineVideoCamera/>
                    </span>
                    <p className="text-white">{subSec?.title}</p>
                </div>
                <p>{convertSecondsToDuration(subSec?.timeDuration)}</p>
            </div>
        </div>
    )

}

export default CourseSubSectionAccordion;