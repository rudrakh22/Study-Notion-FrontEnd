import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Settings from "./Components/Core/Dashboard/Settings";
import EnrolledCourses from "./Components/Core/Dashboard/Students/EnrolledCourse";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./Components/Core/Dashboard/Students/Cart";
import BookmarkedCourses from "./Components/Core/Dashboard/Students/Wishlist/index";
import AddCourse from "./Components/Core/Dashboard/Instructor/AddCourse";
import MyCourses from "./Components/Core/Dashboard/Instructor/MyCourse/MyCourse";
import EditCourse from "./Components/Core/Dashboard/Instructor/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails";
import Error from "./Pages/Error";
import Instructor from "./Components/Core/Dashboard/Instructor/InstructorDashboard/Instructor";
import { setProgress } from "./slices/loadingBarSlice";
import LoadingBar from "react-top-loading-bar";
import ScrollToTop from "./Components/Common/ScrollToTop";
import SearchCourse from "./Pages/SearchCourse.jsx";
import { RiWifiOffLine } from "react-icons/ri";
import AdminPanel from "./Components/Core/AdminPanel";
import {useDispatch} from "react-redux";

function App() {
  const {user} = useSelector((state) => state.profile);
  const {progress}=useSelector((state)=>state.loadingBar);
  const dispatch = useDispatch();
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <LoadingBar
        color="#FFD60A"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      {!navigator.onLine && (
        <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      <Navbar setProgress={setProgress}/>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>} />
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="/search/:searchQuery" element={<SearchCourse />} />


        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {(user?.accountType === ACCOUNT_TYPE.STUDENT ||
            ACCOUNT_TYPE.ADMIN) && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/bookmarked-courses"
                element={<BookmarkedCourses />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/my-courses" element={<MyCourses/>}/>
            <Route path="dashboard/instructor" element={<Instructor/>}/>

            <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>
        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <>
            <Route path="dashboard/admin-panel" element={<AdminPanel/>}/>
          </>
        )}

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="forget-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {user?.accountType===ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="view-course/:courseID/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
            </>
          )}
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
