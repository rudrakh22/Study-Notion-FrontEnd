import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getPasswordResetToken} from "../Services/Operations/AuthApi";
import { IoArrowBack } from "react-icons/io5";
import HighlightText from "../Components/Core/HomePage/HighlightText";

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center my-14 overflow-y-hidden">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 fixed">
          <h1 className="text-richblack-5 font-semibold text-3xl">
            {!emailSent ? "Reset Password" : "Check Your Email"}
          </h1>
          <p className="text-richblack-100 my-4 text-xl font-semibold">
            {!emailSent ? (
              "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            ) : (
              <>
                We have sent the reset email to
                <HighlightText text={`${email}`} />
              </>
            )}
          </p>
          <form onSubmit={onSubmitHandler}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address<sup className="text-pink-400">*</sup>
                </p>
                <input
                  type="text"
                  value={email}
                  required
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border-b-[0.001rem] border-richblack-5"
                />
              </label>
            )}

            <button
              type="submit"
              className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <IoArrowBack />
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
