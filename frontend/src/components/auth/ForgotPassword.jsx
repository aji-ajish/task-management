import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SmallLoader from "../layouts/SmallLoader"
import { clearAuthError, forgotPassword } from "../../actions/userAction"
import { toast } from "react-toastify"

export default function ForgotPassword() {
    const [email, setEmail] = useState('rajesh.m@example.com')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, message, activationToken } = useSelector(state => state.authState)


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (activationToken) {
            navigate("/otpVerification");
            localStorage.setItem("activationToken", activationToken);
        }
    }, [activationToken, navigate]);

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
                        <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">Forgot Password</h3>
                        <p className="font-medium text-indigo-600 hover:text-indigo-500">Enter your email address</p>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-8 space-y-5">
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                    </div>

                    <button
                        disabled={loading}
                        onClick={submitHandler}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" >
                        {loading & loading ? (
                            <SmallLoader />
                        ) : (
                            "Request OTP"
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}
