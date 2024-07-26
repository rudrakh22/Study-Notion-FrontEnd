import { useForm } from "react-hook-form";
import { useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import IconBtn from "../../../../../Common/IconBtn";
import NestedView from "./NestedView";
import { BiRightArrowCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  setStep,
  setCourse,
  setEditCourse,
} from "../../../../../../slices/courseSlice";
import {
  updateSection,
  createSection,
} from "../../../../../../Services/Operations/courseDetailsApi";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(false);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const gotoNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const gotoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] bg-richblack-800 border-richblack-700 p-6 ">
      <p className="text-richblue-5 font-semibold text-2xl">Course Builder</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 border-[1px]"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-richblack-5 text-sm">
            Section Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            {...register("sectionName", { required: true })}
            placeholder="add a section to build your course"
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="tracking-wide text-pink-200 text-sm ml-2">
              Section name is required!
            </span>
          )}
        </div>
        {/* Section button */}
        <div>
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <BsPlusCircleDotted className="text-yellow-50" fontSize={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 hover:scale-110 hover:text-yellow-50 transition-all duration-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* nested View of sections */}
      {course?.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* pagination button */}
      <div className="flex justify-end gap-x-2">
        <button
          onClick={gotoBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <IconBtn onclick={gotoNext} text="Next" disabled={loading}>
          <BiRightArrowCircle />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
