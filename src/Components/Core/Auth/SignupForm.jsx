import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../Services/Operations/AuthApi";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../Common/Tab";
import { MdDoNotDisturbOn } from "react-icons/md";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [validation, setValidation] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const numberRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{6,}/;

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    if (event.target.value.length === 0) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please check again.");
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return;
    }

    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = numberRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);

    if (!minLengthPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Password Too Short");
    } else if (!uppercasePassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Uppercase");
    } else if (!lowercasePassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Lowercase");
    } else if (!digitsPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Number");
    } else if (!specialCharPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Special Character");
    }

    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.INSTRUCTOR);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  const validationData = [
    {
      id: 1,
      name: "one lowercase character",
      regx: lowercaseRegExp,
    },
    {
      id: 2,
      name: "one special character",
      regx: specialCharRegExp,
    },
    {
      id: 3,
      name: "one uppercase character",
      regx: uppercaseRegExp,
    },
    {
      id: 4,
      name: "minimum 8 characters",
      regx: minLengthRegExp,
    },
    {
      id: 5,
      name: "one number",
      regx: numberRegExp,
    },
  ];

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={onSubmitHandler} className="flex w-full flex-col gap-y-4">
        {/* Name */}
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              FirstName <sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChangeHandler}
              placeholder="Enter first name"
              styles={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              LastName <sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChangeHandler}
              placeholder="Enter last name"
              styles={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        {/* email */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="Enter email address"
            styles={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        {/* password */}
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChangeHandler}
              onClick={() => setValidation(true)}
              placeholder="Enter Password"
              styles={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeHandler}
              placeholder="Confirm Password"
              styles={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        {/* validation */}
        {}
        <div
          className={`mt-5 justify-start items-center flex-wrap gap-4 ${
            validation ? "flex" : "hidden"
          }`}
        >
          {validationData.map((item) => (
            <div className="flex gap-2 items-center" key={item.id}>
              {item.regx.test(password) ? (
                <AiFillCheckCircle className="text-caribbeangreen-200" />
              ) : (
                <MdDoNotDisturbOn className="text-pink-400" />
              )}
              <p
                className={`${
                  item.regx.test(password)
                    ? "text-caribbeangreen-200"
                    : "text-pink-400"
                } transition-all duration-200`}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[12px] font-semibold text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
