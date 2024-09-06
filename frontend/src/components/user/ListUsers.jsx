import { useEffect, useState } from 'react'
import SideMenu from '../layouts/SideMenu'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, deleteUser, getAllUsers } from '../../actions/userAction'
import Loader from '../layouts/Loader'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import addUser from '../../assets/svg/addUser.svg'

const ListUsers = () => {
    const dispatch = useDispatch()
    const [listLimit, setListLimit] = useState(5)
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [deleteItem, setDeleteItem] = useState(false)
    const [isLimitInitialized, setIsLimitInitialized] = useState(false);

    const getCurrentPageNumber = (page) => {
        setCurrentPageNo(page)
    }

    useEffect(() => {
        const storedLimit = localStorage.getItem('pageLimit');
        setListLimit(storedLimit ? Number(storedLimit) : 5);
        setIsLimitInitialized(true);
    }, []);

    useEffect(() => {
        // Only dispatch when limit is initialized
        if (isLimitInitialized) {
            dispatch(getAllUsers(currentPageNo, listLimit));
        }
        deleteItem
        return () => {
            setDeleteItem(false)
        }
    }, [dispatch, currentPageNo, listLimit, deleteItem, isLimitInitialized]);

    const { loading, error, userList, message } = useSelector((state) => state.authState);

    const { totalUsers, totalPages, previousPage, currentPage, nextPage, limit } = userList?.pagination || {};

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
    }, [error, dispatch, message])



    const handleDeleteUser = (userId) => {
        if (userId !== '66af92a44056010e07dbb26a') {
            if (window.confirm("Are you sure to delete this record?")) {
                setDeleteItem(true)
                dispatch(deleteUser(userId));
            }
        }
    };

    // Function to render table rows
    const TableTR = () => {
        return (
            userList?.data?.map((user, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {/* Calculate Serial Number */}
                        {index + 1 + (currentPage - 1) * limit}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        {user.name}
                    </td>
                    <td className="px-6 py-4">
                        {user.email}
                    </td>
                    <td className="px-6 py-4">
                        {user.address}
                    </td>
                    <td className="px-6 py-4">
                        {user.phone}
                    </td>
                    <td className="px-6 py-4 capitalize">
                        {user.role}
                    </td>
                    <td className={`${user.status === 1 ? 'text-green-400' : 'text-red-500'} px-6 py-4`}>
                        {user.status === 1 ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-6 py-4 justify-center gap-5 flex">
                        <Link to={`${user._id === '66af92a44056010e07dbb26a' ? '#' : `/allUsers/user/${user._id}`}`} className={`${user._id === '66af92a44056010e07dbb26a' && 'cursor-not-allowed'} font-medium px-4 py-1 bg-green-600 rounded-md text-white`}>Edit</Link>
                        <p className={`${user._id === '66af92a44056010e07dbb26a' ? 'cursor-not-allowed' : 'cursor-pointer'} font-medium px-4 py-1  bg-red-600 rounded-md text-white`} onClick={() => handleDeleteUser(user._id)}>Delete</p>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <>
            <MetaData title={"All Users"} />
            <SideMenu noClass>
                <main className="py-14 w-3/4 ">
                    <div className={`${!loading && 'relative overflow-x-auto shadow-md sm:rounded-lg max-h-full '}`}>
                        <div className="">

                            <Link to={'/newUser'} className="inline-flex items-center text-white mb-2 bg-white
                                                            font-medium rounded-lg text-sm px-3 gap-2 py-1.5 dark:bg-blue-400 ">
                                <img src={addUser} className="size-6" />
                                <span> Add User</span>
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
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !loading && totalUsers > 0 ? <TableTR /> :
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
                    {totalPages && (
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
                                    {limit * (currentPage - 1) + 1}-{limit * (currentPage - 1) + userList.data.length}
                                </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                    {totalUsers}
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
    );
}

export default ListUsers;
