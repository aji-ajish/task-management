import { useNavigate } from "react-router-dom"

export default function ResetPassword() {

    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className="max-w-sm w-full dark:text-white">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">Reset Your Password</h3>
                </div>
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 space-y-5"
            >
                <div>
                    <label className="font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>

                <button onClick={submitHandler} className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Reset
                </button>
            </form>
        </div>
    )
}
