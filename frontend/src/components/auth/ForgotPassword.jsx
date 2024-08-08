import { useNavigate } from "react-router-dom"

export default function ForgotPassword() {
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        navigate('/otpVerification')
    }

    return (

        <div className="max-w-sm w-full dark:text-white">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">Forgot Password</h3>
                    <p className="font-medium text-indigo-600 hover:text-indigo-500">Enter your email address. and OTP is send Your email</p>
                </div>
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 space-y-5"
            >
                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>

                <button
                    onClick={submitHandler} className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Request OTP
                </button>
            </form>
        </div>
    )
}
