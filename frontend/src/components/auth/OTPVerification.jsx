import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


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

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    navigate('/resetPassword')
  }

  return (
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
          <button onClick={submitHandler} className=" px-4 mt-5 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Verify
          </button>
        </div>

      </div>
    </div>
  )
}