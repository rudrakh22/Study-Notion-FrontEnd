import { updateDisplayPicture } from "../../../../Services/Operations/SettingApi";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../../../Common/IconBtn";
import { toast } from "react-hot-toast";
const ChangeProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const changeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error("Upload Failed");
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 p-2 px-4 text-richblack-5">
      <div className="flex items-center gap-x-4 flex-col sm:flex-row sm:m-0 mx-auto">
        <img
          src={
            previewSource ||
            user?.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${lastName}`
          }
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-center sm:text-left">Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={changeHandler}
              className="hidden"
              accept="image/png,image/gif,image/jpeg,image/jpg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
