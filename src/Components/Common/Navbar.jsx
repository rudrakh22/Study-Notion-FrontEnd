import { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink, useLocation, matchPath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavbarLinks } from "../../data/navbar-links.js";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import Skeleton from "react-loading-skeleton";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiSearch } from "react-icons/hi";

const Navbar = ({ setProgress }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      if (response.data.data.length > 0) {
        setSubLinks(response.data.data);
      }
      localStorage.setItem("sublinks", JSON.stringify(response.data.data));
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const show = useRef();
  const overlay = useRef();
  const shownav = () => {
    show.current.classList.toggle("navshow");
    overlay.current.classList.toggle("hidden");
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue?.length > 0) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex sm:relative bg-richblack-900 w-screen relative z-50 justify-center items-center h-14 border-b-[1px] border-b-richblack-700
                            ${
                              location.pathname !== "/"
                                ? "bg-richblack-800"
                                : "bg-[#000c23]"
                            }
                            transition-all duration-500 
                            ${
                              location.pathname
                                .split("/")
                                .includes("dashboard") ||
                              location.pathname
                                .split("/")
                                .includes("view-course")
                                ? ""
                                : "fixed top-0 w-screen z-20"
                            }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between pr-10">
        <div>
          <Link
            to="/"
            onClick={() => {
              dispatch(setProgress(100));
            }}
          >
            <img src={logo} alt="logo" width={160} height={42} loading="lazy" />
          </Link>
        </div>

        {/* mobile navbar */}
        <div className="flex items-center gap-x-10 ">
          {user && user?.accountType !== "Instructor" && (
            <div className=" md:hidden">
              <Link
                to="/dashboard/cart"
                className=" relative left-10"
                onClick={() => {
                  dispatch(setProgress(100));
                }}
              >
                <div className="">
                  <AiOutlineShoppingCart className=" fill-richblack-25 w-8 h-8" />
                </div>
                {totalItems > 0 && (
                  <span className=" font-medium text-[12px] shadow-[3px ] shadow-black bg-yellow-100 text-richblack-900 rounded-full px-[4px] absolute -top-[2px] right-[1px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          <div className={`flex md:hidden relative flex-row `}>
            <GiHamburgerMenu
              className={`w-16 h-8 fill-richblack-25 absolute -bottom-4`}
              onClick={shownav}
            />
            <div
              ref={overlay}
              className="fixed top-0 bottom-0 left-0 right-0 z-30 bg w-[100vw] hidden h-[100vh] overflow-y-hidden bg-[rgba(0,0,0,0.5)]"
              onClick={shownav}
            ></div>
            <div ref={show} className="mobNav z-50 ">
              <nav
                className="items-center flex flex-col absolute w-[200px] right-0 glass2 pr-2 -top-3 translate-x-[30%]"
                ref={show}
              >
                {token == null && (
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setProgress(100));
                    }}
                  >
                    <button
                      onClick={shownav}
                      className="mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                    >
                      Login
                    </button>
                  </Link>
                )}
                {token == null && (
                  <Link
                    to="/signup"
                    className="text-yellow-50"
                    onClick={() => {
                      dispatch(setProgress(100));
                    }}
                  >
                    <button
                      onClick={shownav}
                      className="mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                    >
                      Signup
                    </button>
                  </Link>
                )}

                {token !== null && (
                  <div className="mt-2 flex gap-2 items-center justify-center">
                    <p className="text-richblack-50 text-lg text-center mb-2">
                      Account
                    </p>
                    <ProfileDropDown />
                  </div>
                )}
                <div className="mt-4 mb-4 bg-richblack-25 w-full h-[2px]"></div>
                <p className="text-xl text-yellow-50 font-semibold">Courses</p>
                <div className="flex flex-col items-end pr-4">
                  {subLinks?.length > 0 &&
                    subLinks?.map((element, index) => (
                      <Link
                        to={`/catalog/${element.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        key={index}
                        onClick={() => {
                          dispatch(setProgress(30));
                          shownav();
                        }}
                        className="p-2 text-sm"
                      >
                        <p className="text-richblack-5">{element?.name}</p>
                      </Link>
                    ))}
                </div>
                <div className="mt-4 mb-4 bg-richblack-25 w-full h-[2px]"></div>
                <Link
                  to="/about"
                  onClick={() => {
                    dispatch(setProgress(100));
                    shownav();
                  }}
                  className="p-2 flex items-center"
                >
                  <p className="text-richblack-5">About</p>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => {
                    dispatch(setProgress(100));
                    shownav();
                  }}
                  className="p-2 flex items-center"
                >
                  <p className="text-richblack-5">Contact</p>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop navbar */}
        <nav className="">
          <ul className="flex-row gap-x-6 md:flex hidden text-richblack-25 hover:cursor-pointer gap-5">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    <div className="absolute invisible left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {subLinks?.length < 0 ? (
                        <div></div>
                      ) : (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, index) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 w-full hover:bg-richblack-50"
                              key={index}
                              onClick={() => dispatch(setProgress(30))}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link?.path}
                    onClick={() => {
                      dispatch(setProgress(100));
                    }}
                  >
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-100"
                      }`}
                    >
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}
            <form
              onSubmit={handleSearch}
              className="flex items-center relative"
            >
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="searchInput"
                type="text"
                placeholder="Search"
                className=" absolute top-0 left-0 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700"
              />
              <HiSearch
                type="submit"
                id="searchIcon"
                size={20}
                className=" text-richblack-100 top-1 absolute cursor-pointer left-20"
              />
            </form>
          </ul>
        </nav>

        <div className="lg:flex gap-x-4 items-center hidden">
          {token === null && (
            <Link to="/login">
              <button
                className={`border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-500
                                `}
              >
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className={`border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5
                                            transition-all duration-500`}
              >
                Sign Up
              </button>
            </Link>
          )}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
