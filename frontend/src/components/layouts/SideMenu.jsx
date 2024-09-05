import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, logout } from "../../actions/userAction";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import userIcon from '../../assets/svg/user.svg'
import users from '../../assets/svg/users.svg'
import logoutSvg from '../../assets/svg/logout.svg'
import downArrow from '../../assets/svg/downArrow.svg'
import burgerMenu from '../../assets/svg/burgerMenu.svg'
import avatar from '../../assets/dummyAvatar.png'
import department from '../../assets/svg/department.svg'

export default function SideMenu({ children, noClass }) {
  const dispatch = useDispatch();
  const dropDown1 = useRef();
  const sideMenu = useRef();
  const grayBG = useRef();
  const menuIcon = useRef();
  const navigate = useNavigate();

  const { error, user } = useSelector((state) => state.authState);

  const SubmenuOpen = () => {
    if (dropDown1.current.classList.contains("hidden")) {
      dropDown1.current.classList.remove("hidden");
    } else {
      dropDown1.current.classList.add("hidden");
    }
  };

  const openSideBar = () => {
    sideMenu.current.classList.remove("-translate-x-full");
    grayBG.current.classList.remove("hidden");
  };

  const closeSideMenu = () => {
    sideMenu.current.classList.add("-translate-x-full");
    grayBG.current.classList.add("hidden");
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/"); // Redirect to login or home page after logout
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, dispatch]);

  return (
    <div>
      <button
        ref={menuIcon}
        onClick={openSideBar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <img src={burgerMenu} className="size-8" />
      </button>

      <aside
        ref={sideMenu}
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'/dashboard'}
                className="flex items-center p-2 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <div>
                  <p className="mx-4 text-[28px] relative">Task Manager</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={'/profile'}
                className="flex items-center p-2 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src={user.image ? `${process.env.API_URL}/${user.image}` : avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div className="capitalize">
                  <p className="mx-4 text-2xl relative ">{user.name}</p>
                  <span className="absolute text-xs mx-4 text-slate-400">
                    {user.role}
                  </span>
                </div>
              </Link>
            </li>

            {user.role && user.role === 'admin' ?
              <>
                {/* <li>
                  <button
                    onClick={SubmenuOpen}
                    type="button"
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <img src={userIcon} className="size-7" />
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Users
                    </span>
                    <img src={downArrow} className="size-6" />
                  </button>
                  <ul ref={dropDown1} className="hidden py-2 space-y-2">
                    <li>
                      <Link
                        to="/allUsers"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <img src={users} className="size-6" />
                        <span className="ml-2">All Users</span>
                      </Link>
                    </li>
                  </ul>
                </li>  */}
                <li>
                  <Link to="/allUsers" className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={userIcon} className="size-6" />
                    <span
                      className="flex-1 ms-3 whitespace-nowrap">
                      All Users
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to='/departmentList' className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={department} className="size-6" />
                    <span
                      className="flex-1 ms-3 whitespace-nowrap">
                      Departments
                    </span>
                  </Link>
                </li>
              </>
              : ''}


            <li>
              <p className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={logoutSvg} className="size-6" />
                <span
                  onClick={handleLogout}
                  className="flex-1 ms-3 whitespace-nowrap">
                  Logout
                </span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 h-screen">
        <div className={`p-4 border-2 h-full text-white ${noClass & 'items-center'} justify-center flex  border-gray-200 border-dashed rounded-lg dark:border-gray-700`}>
          {children}
        </div>
      </div>
      <div
        onClick={closeSideMenu}
        ref={grayBG}
        className="hidden bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
      ></div>
    </div>
  );
}
