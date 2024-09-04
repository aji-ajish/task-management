import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { clearAuthError, resetPassword } from "../../actions/userAction"
import SmallLoader from "../layouts/SmallLoader"

export default function ResetPassword() {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { message, loading, error, userId } = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== newPassword) {
            toast.error('old and new password are should be same', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (userId && newPassword) {
            dispatch(resetPassword(userId, newPassword))
        }
    }

    useEffect(() => {
        if (!userId) {
            navigate('/')
        }
    }, [navigate, userId])

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
                onOpen: () => {
                    dispatch(clearAuthError);
                },
            });
            return;
        }
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
    }, [dispatch, error, message]);


    return (
        <section className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full dark:text-white">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">Reset Your Password</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-8 space-y-5">
                    <div>
                        <label className="font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                    </div>
                    <div>
                        <label className="font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                    </div>


                    <button
                        disabled={loading}
                        onClick={submitHandler}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" >
                        {loading & loading ? (
                            <SmallLoader />
                        ) : (
                            "Reset"
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}
