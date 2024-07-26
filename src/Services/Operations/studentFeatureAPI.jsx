import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
const RAZORPAY_KEY = import.meta.env.VITE_REACT_APP_RAZORPAY_KEY;

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error(
        "Failed to load RazorPay SDK. Check your Internet Connection"
      );
      return;
    }
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thanks you for Purchasing the course",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
    });
  } catch (error) {
    toast.error("Could not make payment");
  }
  toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful! You are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    toast.error("Payment Verification Failed");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.error("Failed to send payment success email", error);
  }
}
