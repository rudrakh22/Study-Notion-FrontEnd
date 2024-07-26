import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCourseCategories,
  addCourseDetails,
  editCourseDetails,
} from "../../../../../../Services/Operations/courseDetailsApi";
import { setStep, setCourse } from "../../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import IconBtn from "../../../../../Common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
      setValue("courseLanguage", course.language);
      setValue("courseLevel", course.level);
    }

    getCategories();
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseLanguage !== course.language ||
      currentValues.courseLevel !== course.level
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();

        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues?.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues?.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues?.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues?.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues?.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        if (currentValues.courseLanguage !== course.language) {
          formData.append("language", data.courseLanguage);
        }
        if (currentValues.courseLevel !== course.level) {
          formData.append("level", data.courseLevel);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    formData.append("language", data.courseLanguage);
    formData.append("level", data.courseLevel);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* course title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="courseTitle"
          id="courseTitle"
          placeholder="Enter course title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Please enter your course title
          </span>
        )}
      </div>

      {/* course short description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          name="courseShortDesc"
          placeholder="Enter course short description"
          {...register("courseShortDesc", { required: true })}
          className="form-style min-h-[130px] w-full resize-x-none"
        />
        {errors.courseShortDesc && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Please enter your course description
          </span>
        )}
      </div>

      {/* course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            name="coursePrice"
            id="coursePrice"
            placeholder="Enter course price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute text-richblack-400 left-3 top-1/2 inline-block -translate-y-1/2 text-2xl" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-sm tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* course category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          name="courseCategory"
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Course category is required!
          </span>
        )}
      </div>

      {/* course level */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Level <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseLevel"
          {...register("courseLevel", { required: true })}
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a level
          </option>
          {!loading &&
            ["All", "Beginner", "Intermediate", "Advance"]?.map(
              (level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              )
            )}
        </select>
        {errors.courseLevel && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Course Level is required!
          </span>
        )}
      </div>

      {/* course language */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseLanguage" className="text-richblack-5 text-sm">
          Course Language <sup className="text-pink-200">*</sup>
        </label>

        <select
          id="courseLanguage"
          {...register("courseLanguage", { required: true })}
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a language
          </option>
          {!loading &&
            ["English", "Hindi"]?.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
        </select>
        {errors.courseLanguage && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Course Language is required!
          </span>
        )}
      </div>

      {/* Course Tag */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of course */}
      <div className="flex space-y-2 flex-col">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Benefits of the course
          <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[120px] w-full"
        />
        {errors.courseBenefits && (
          <span className="tracking-wide text-pink-200 text-sm ml-2">
            Benefits of course is required!
          </span>
        )}
      </div>

      {/* Requirement/instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
