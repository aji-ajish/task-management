import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userAction";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layouts/Loader";
import useToastNotifications from "../utility/useToastNotifications";
import SmallLoader from "../layouts/SmallLoader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isPasswordHidden, setPasswordHidden] = useState(true)

  // const [showError, setShowError] = useState(null);

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.authState
  );

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("dashboard");
      return;
    }
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
  }, [isAuthenticated, navigate, loading, dispatch, error]);


  return (
    <>
      <MetaData title={"Login"} />
      <section className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full dark:text-white border border-white px-7 p-7 rounded-lg">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">
                Log in to your account
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            {/* <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div> */}
            <div>
              <label className="font-medium">
                Password
              </label>
              <div className="relative max-w-xs mt-2">
                <button className="text-gray-600 absolute right-3 top-2 inset-y-0 my-auto active:text-gray-600"
                  onClick={(e) => { e.preventDefault(); setPasswordHidden(!isPasswordHidden) }}
                >
                  {
                    isPasswordHidden ? (
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>

                    )
                  }
                </button>
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent  outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              {loading & loading ? (
                <SmallLoader />
              ) : (
                "Sign in"
              )}
            </button>
            <div className="text-center">
              <Link to="forgotPassword" className="hover:text-indigo-600">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
