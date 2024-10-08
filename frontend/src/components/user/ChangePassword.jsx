import { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import SideMenu from "../layouts/SideMenu";
import SmallLoader from "../layouts/SmallLoader";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearAuthError, logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function ChangePassword() {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, error, message, status } = useSelector(state => state.authState)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changePassword(oldPassword, newPassword))

  }

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
  }, [error, dispatch])

  useEffect(() => {
    if (message) {
      toast.success(message, {
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

    if (status) {
      dispatch(logout())
    }
  }, [message, dispatch, status])

  // useToastNotifications(error, message);
  return (
    <>
      <MetaData title={"Change Password"} />
      <SideMenu>
        <section className="w-full max-h-full flex flex-col items-center justify-center px-4">
          <div className="max-w-sm w-full dark:text-white border border-white px-7 p-7 rounded-lg">
            <div className="text-center">
              <div className="mt-5 space-y-2">
                <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">
                  Change Your Password
                </h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="font-medium">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button
                disabled={loading}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                {loading & loading ? (
                  <SmallLoader />
                ) : (
                  "Change Password"
                )}
              </button>

            </form>
          </div>
        </section>
      </SideMenu>
    </>
  )
}
