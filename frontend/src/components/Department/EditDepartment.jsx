import { useNavigate, useParams } from "react-router-dom"
import MetaData from "../layouts/MetaData"
import SideMenu from "../layouts/SideMenu"
import { useEffect, useState } from "react"
import SmallLoader from "../layouts/SmallLoader"
import { useDispatch, useSelector } from "react-redux"
import { clearDeptError, singleDepartment, updateDepartment } from "../../actions/departmentAction"
import { toast } from "react-toastify"



const EditDepartment = () => {


    const { singleDepartmentDetail, error, loading, message } = useSelector(state => state.departmentState)

    const [name, setName] = useState('')
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(singleDepartment(id))
    }, [dispatch, id])

    useEffect(() => {
        if (singleDepartmentDetail) {
            setName(singleDepartmentDetail.departmentName || '');
        }
    }, [singleDepartmentDetail]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name !== '') {
            const data = { departmentName: name.toLowerCase() };

            dispatch(updateDepartment(id,data))
        }
    }

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
                    dispatch(clearDeptError);
                },
            });
            return;
        }

    }, [message, dispatch]);

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
                    dispatch(clearDeptError);
                },
            });
            return;
        }
    }, [error, dispatch])

    return (
        <>
            <MetaData title={"Edit Department"} />
            <SideMenu noClass>
                <main className="py-14 w-1/2 ">
                    <div className={`${'relative overflow-x-auto shadow-md sm:rounded-lg max-h-full '}`}>
                        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                            <div className="max-w-screen-xl mx-auto px-4 dark:text-white md:px-8 ">
                                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                                    <p className="text-3xl font-semibold sm:text-4xl">
                                        Edit Department
                                    </p>
                                </div>
                                <div className="mt-4 max-w-lg mx-auto">
                                    <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
                                        <div>
                                            <label className="font-medium">Department Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                        >
                                            {loading & loading ? (
                                                <SmallLoader />
                                            ) : (
                                                "Update"
                                            )}

                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </SideMenu>
        </>
    )
}

export default EditDepartment
