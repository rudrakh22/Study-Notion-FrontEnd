import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./AuthApi";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  CREATE_SOCIAL_API,
  UPDATE_SOCIAL_API,
  DELETE_SOCIAL_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display picture updated successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      toast.error("Could not upload image");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({
          ...response.data.updatedUserDetails,
          image: userImage,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.updatedUserDetails)
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Unable to Update Profile", error);
    }
    toast.dismiss(toastId);
  };
}

export function createSocial(token, formData) {
  let result = false;
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", CREATE_SOCIAL_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser({ ...response.data.data }));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      result = true;
      toast.success("Social profile created successfully");
    } catch (error) {
      toast.error("Something went wrong", error);
    }
    toast.dismiss(toastId);
    return result;
  };
}

export function updateSocial(data, token) {
  let result = false;
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_SOCIAL_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser({ ...response.data.data }));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      result = true;
      toast.success("Social profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
    toast.dismiss(toast.id);
    return result;
  };
}

export function deleteSocial(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", DELETE_SOCIAL_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser({ ...response.data.data }));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Social profile deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
    toast.dismiss(toast.id);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password changed successfully");
  } catch (error) {
    toast.error("Old password is incorrect");
  }
  toast.dismiss(toastId);
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account deleted successfully");
      dispatch(logout(navigate));
    } catch (error) {
      toast.error("Unable to delete profile");
    }
    toast.dismiss(toast.id);
  };
}
