import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { setCourse } from "../../../../../../slices/courseSlice";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../../Services/Operations/courseDetailsApi";
import ConfirmationModal from "../../../../../Common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };
  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">
        {course?.courseContent.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between py-2 border-richblack-600 cursor-pointer">
              <div className="flex items-center gap-x-3 py-2">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              {/* buttons */}
              <div className="flex items-center gap-x-3">
                {/* edit button */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <FiEdit2 className="text-xl text-richblack-300 hover:text-richblack-5" />
                </button>
                {/* delete button */}
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lecture in this section will be deleted",
                      btnText1: "Delete",
                      btnText2: "Cancel",
                      btnHandler1: () => handleDeleteSection(section._id),
                      btnHandler2: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300 hover:text-richblack-5" />
                </button>

                <span className="font-medium text-richblack-300">|</span>
                <BiDownArrow className="text-xl text-richblack-300 hover:text-richblack-5" />
              </div>
            </summary>

            <div className="px-6 pb-4">
              {section.subSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between py-2 border-b-2 border-richblack-600 cursor-pointer gap-x-3"
                >
                  <div className="flex-row items-center gap-x-3 py-2">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  {/* edit and delete button */}
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    {/* Edit button */}
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <FiEdit2 className="text-xl text-richblack-300 hover:text-richblack-5" />
                    </button>
                    {/* delete button */}
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this subsection",
                          text2:
                            "Selected lecture in this sub section will be deleted",
                          btnText1: "Delete",
                          btnText2: "Cancel",
                          btnHandler1: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btnHandler2: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add lecture */}
              <button
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                onClick={() => setAddSubSection(section._id)}
              >
                <AiOutlinePlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
