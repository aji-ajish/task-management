import { Link } from "react-router-dom"
import MetaData from "../layouts/MetaData"
import SideMenu from "../layouts/SideMenu"
import department from '../../assets/svg/department.svg'
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layouts/Loader"
import { useEffect, useState } from "react"
import { deleteDepartment, getDepartmentList } from "../../actions/depatrtmentAction"
import { toast } from "react-toastify"
import { clearDepartmentError } from "../../slices/departmentSlice"


const DepartmentList = () => {


    const dispatch = useDispatch()

    const [listLimit, setListLimit] = useState(5)
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [isLimitInitialized, setIsLimitInitialized] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false)

    const getCurrentPageNumber = (page) => {
        setCurrentPageNo(page)
    }

    useEffect(() => {
        const storedLimit = localStorage.getItem('pageLimit');
        setListLimit(storedLimit ? Number(storedLimit) : 5);
        setIsLimitInitialized(true);
    }, []);

    useEffect(() => {
        if (isLimitInitialized) {
            dispatch(getDepartmentList(currentPageNo, listLimit))
        }
        deleteItem
        return () => {
            setDeleteItem(false)
        }
    }, [dispatch, currentPageNo, listLimit, isLimitInitialized, deleteItem])

    const { error, loading, departmentList, message } = useSelector(state => state.departmentState)
    const { totalDepartments, totalPages, previousPage, currentPage, nextPage, limit } = departmentList?.pagination || {};

    const handleLimitChange = (no) => {
        localStorage.setItem('pageLimit', no);
        setListLimit(Number(no));
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
                    dispatch(clearDepartmentError);
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
                    dispatch(clearDepartmentError);
                },
            });
            return;
        }
    }, [error, dispatch, message])



    const handleDeleteUser = (Id) => {
        if (Id !== '66dace652d64ddbde66861a6') {
            if (window.confirm("Are you sure to delete this record?")) {
                setDeleteItem(true)
                dispatch(deleteDepartment(Id));
            }
        }

    };


    const TableTR = () => {
        return (
            departmentList?.data?.map((department, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={department._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {/* Calculate Serial Number */}
                        {index + 1 + (currentPage - 1) * limit}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                        {department.departmentName}
                    </td>

                    <td className="px-6 py-4 justify-center gap-5 flex">
                        <Link to={`${department._id === '66dace652d64ddbde66861a6' ? '#' : `/departmentList/department/${department._id}`}`} className={`${department._id === '66dace652d64ddbde66861a6' && 'cursor-not-allowed'} font-medium px-4 py-1 bg-green-600 rounded-md text-white`}>Edit</Link>
                        <p className={`${department._id === '66dace652d64ddbde66861a6' ? 'cursor-not-allowed' : 'cursor-pointer'} font-medium px-4 py-1  bg-red-600 rounded-md text-white`} onClick={() => handleDeleteUser(department._id)}>Delete</p>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <>
            <MetaData title={"Department List"} />
            <SideMenu noClass>
                <main className="py-14 w-1/2 ">
                    <div className={`${!loading && 'relative overflow-x-auto shadow-md sm:rounded-lg max-h-full '}`}>
                        <div className="">

                            <Link to={'/addDepartment'} className="inline-flex items-center text-white mb-2 bg-white
                                        font-medium rounded-lg text-sm px-3 gap-2 py-1.5 dark:bg-blue-400 ">
                                <img src={department} className="size-6" />
                                <span> Add Department</span>
                            </Link>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-auto">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 sticky top-0 dark:text-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !loading && totalDepartments > 0 ? <TableTR /> :
                                            <th colSpan={3} className="px-6 py-3 text-center">
                                                No Data
                                            </th>
                                    }
                                </tbody>
                            </table>
                        </div>
                        {loading &&
                            <div className="flex items-center justify-center w-full h-56">
                                <Loader />
                            </div>
                        }
                    </div>
                    {/* Pagination component */}
                    {totalPages !== 0 && (
                        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                Limit <span className="font-semibold text-gray-900 ml-1">
                                    <select className='outline-none border-none p-1 rounded-lg dark:bg-gray-500 bg-white' value={listLimit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
                                        <option className='text-black dark:text-white' value={5}>5</option>
                                        <option className='text-black dark:text-white' value={10}>10</option>
                                        <option className='text-black dark:text-white' value={15}>15</option>
                                        <option className='text-black dark:text-white' value={20}>20</option>
                                    </select>
                                </span>
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">
                                    {limit * (currentPage - 1) + 1}-{limit * (currentPage - 1) + departmentList?.data.length}
                                </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                    {totalDepartments}
                                </span>
                            </span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                {previousPage && (
                                    <li>
                                        <p onClick={() => getCurrentPageNumber(currentPageNo - 1)} className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                                    </li>
                                )}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index}>
                                        <p onClick={() => getCurrentPageNumber(index + 1)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1
                                            ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                            }`}>
                                            {index + 1}
                                        </p>
                                    </li>
                                ))}
                                {nextPage && (
                                    <li>
                                        <p onClick={() => getCurrentPageNumber(currentPageNo + 1)} className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </main>
            </SideMenu>
        </>
    )
}

export default DepartmentList
