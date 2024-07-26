import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Upload from "../Upload";
import { setCourse } from "../../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  updateSubSection,
  createSubSection,
} from "../../../../../../Services/Operations/courseDetailsApi";
import { RxCross1 } from "react-icons/rx";
import IconBtn from "../../../../../Common/IconBtn";
const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No Changes made to the form");
      } else {
        handleEditSubSection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);
    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg bg-richblack-800 border-richblack-400 ">
        {/* header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          {/* Close button */}
          <button
            onClick={() => {
              !loading ? setModalData(null) : {};
            }}
          >
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
            video="true"
          />

          {/* title */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
              Lecture Title<sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="w-full form-style"
            />
            {errors.lectureTitle && (
              <span className="tracking-wide text-pink-200 text-sm ml-2">
                Lecture title is required!
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
              Lecture Description<sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Add lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full form-style"
            />
            {errors.lectureDesc && (
              <span className="tracking-wide text-pink-200 text-sm ml-2">
                Lecture Description is required!
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                disabled={loading}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
