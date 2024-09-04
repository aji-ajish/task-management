import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { clearOtpToken, verifyOTP } from "../../actions/userAction"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import SmallLoader from "../layouts/SmallLoader"


export default function OTPVerification() {

  const fieldsRef = useRef()
  const [state, setState] = useState({ code1: "", code2: "", code3: "", code4: "", code5: "", code6: "" })

  // Switch to input fields method
  const inputFocus = (e) => {
    const elements = fieldsRef.current.children
    const dataIndex = +e.target.getAttribute("data-index")
    if ((e.key === "Delete" || e.key === "Backspace")) {
      const next = dataIndex - 1;
      if (next > -1) {
        elements[next].focus()
      }
    } else {

      const next = dataIndex + 1
      if (next < elements.length && e.target.value != " " && e.target.value != "" && e.key.length == 1) {
        elements[next].focus()
      }
    }
  }


  const handleChange = (e, codeNumber) => {
    const value = e.target.value
    setState({ ...state, [codeNumber]: value.slice(value.length - 1) })
  }

  const activationToken = localStorage.getItem('activationToken')

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { error, message, userId ,loading} = useSelector(state => state.authState)

  const submitHandler = async (e) => {
    e.preventDefault()
    const otp = Object.values(state).join('');

    await dispatch(verifyOTP(otp, activationToken))

  }


  useEffect(() => {
    if (!activationToken || activationToken === '') {
      navigate('/forgotPassword')
    }
  }, [activationToken, navigate])

  if (userId) {
    localStorage.removeItem('activationToken')
    navigate('/resetPassword')
  }

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
          dispatch(clearOtpToken);
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
          dispatch(clearOtpToken);
        },
      });
      return;
    }
  }, [dispatch, error, message]);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-800">
        <div>
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="dark:text-white text-2xl font-bold sm:text-3xl">Verification code</h3>
              <p className="dark:text-slate-400 text-sm pb-2">OTP is send on your mail. Please Verify</p>
            </div>
          </div>
          <div ref={fieldsRef} className="mt-2 flex items-center  gap-x-1 justify-center ">
            <input type="text" data-index="0" placeholder="0" value={state.code1} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code1")}
              onKeyUp={inputFocus}
            />
            <input type="text" data-index="1" placeholder="0" value={state.code2} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code2")}
              onKeyUp={inputFocus}
            />
            <input type="text" data-index="2" placeholder="0" value={state.code3} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code3")}
              onKeyUp={inputFocus}
            />
            <input type="text" data-index="3" placeholder="0" value={state.code4} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code4")}
              onKeyUp={inputFocus}
            />
            <input type="text" data-index="4" placeholder="0" value={state.code5} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code5")}
              onKeyUp={inputFocus}
            />
            <input type="text" data-index="5" placeholder="0" value={state.code6} className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
              onChange={(e) => handleChange(e, "code6")}
              onKeyUp={inputFocus}
            />
          </div>
          <div className="w-1/4 mx-auto">
            <button
              disabled={loading}
              onClick={submitHandler}
              className=" px-4 mt-5 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              {loading & loading ? (
                <SmallLoader />
              ) : (
                "Verify"
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}