const BASE_URL =import.meta.env.VITE_REACT_APP_BASE_URL;

// AUTH Endpoints

export const endpoints={
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}
// profile Endpoints
export const profileEndpoints={
    GET_USER_DETAILS_API:BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_PROFILE_API:BASE_URL + "/profile/userProfile",
    GET_ALL_USER_DATA_API:BASE_URL + "/profile/allUserData",
    DELETE_ACCOUNT_BY_ADMIN:BASE_URL + "/profile/deleteAccountByAdmin",
    GET_INSTRUCTOR_DATA_API:BASE_URL + "/profile/instructorDashboard",
}

//Student Endpoint
export const studentEndpoints={
    COURSE_PAYMENT_API:BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API:BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    SEARCH_COURSES_API:BASE_URL + "/course/searchCourse",
    CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
};

  // RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

  // CATAGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
    DELETE_CATEGORY_API: BASE_URL + "/course/deleteCategory",
    UPDATE_CATEGORY_API: BASE_URL + "/course/updateCategory",
};

  // CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

  // SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
    CREATE_SOCIAL_API: BASE_URL + "/profile/createSocial",
    UPDATE_SOCIAL_API: BASE_URL + "/profile/updateSocial",
    DELETE_SOCIAL_API: BASE_URL + "/profile/deleteSocial",
};

  // *CONTACT-US API
export const contactUsEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
};

  //* Search APIs
export const searchEndpoints = {
    SEARCH_PREDEFINED_RESULT_API: BASE_URL + "/search/getAllCourses",
    QUERY_SEARCH_API: BASE_URL + "/search/dropdown",
    SEARCH_PAGE_API: BASE_URL + "/search"
}