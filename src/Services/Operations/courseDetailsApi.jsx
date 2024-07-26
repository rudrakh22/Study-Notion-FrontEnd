import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setProgress } from "../../slices/loadingBarSlice";
const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  EDIT_COURSE_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,
  SEARCH_COURSES_API,
  CREATE_CATEGORY_API,
} = courseEndpoints;

export const getAllCourses = async () => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error("Unable to fetch courses");
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};
export async function fetchCourseCategories() {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  return result;
}

export const addCourseDetails = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Unable to add course details");
    }
    toast.success("Course details added successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Unable to update section");
    }
    toast.success("Section updated successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Unable to create section");
    }
    toast.success("Section created successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  //
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Unable to update course details");
    }
    toast.success("Course details updated successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Unable to delete section");
    }
    result = response?.data?.data;
    toast.success("Section deleted successfully");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Unable to delete subsection");
    }
    toast.success("Lecture deleted successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Unable to create subsection");
    }
    toast.success("Lecture created successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Unable to update subsection");
    }
    toast.success("Lecture updated successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Unable to fetch instructor courses");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const deleteCourses = async (checkbox, token, instructor) => {
  const toastId = toast.loading("Loading...");
  try {
    for (const courseId of checkbox) {
      const data = { courseId: courseId };
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course");
      }
    }
    if (checkbox.length === instructor) {
      toast.success("All Courses Deleted");
    } else {
      toast.success("All the Selected Courses Deleted");
    }
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    result = error.response.data;
  }
  return result;
};

export const markLectureAsCompleted = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture completed successfully");
    result = true;
  } catch (error) {
    toast.error(error.message);

    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could not create rating");
    }

    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    toast.error("User Already Reviewed");
  }
  toast.dismiss(toastId);
  return success;
};

export const searchCourses = async (searchQuery, dispatch) => {
  dispatch(setProgress(50));
  let result = null;
  try {
    const response = await apiConnector("POST", SEARCH_COURSES_API, {
      searchQuery: searchQuery,
    });
    if (!response?.data?.success) {
      throw new Error("Unable to search courses");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  dispatch(setProgress(100));
  return result;
};

export const createCategory = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Create Category");
    }
    toast.success("Category Created");
    success = true;
  } catch (error) {
    success = false;

    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
