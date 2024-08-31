import React, { useEffect, useRef, useState } from 'react'
import SideMenu from '../layouts/SideMenu'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userAction'

const ListUsers = () => {
    const dispatch = useDispatch()
    const [currentPageNo, setCurrentPageNo] = useState(1)
    
    const getCurrentPageNumber=(page)=>{
        setCurrentPageNo(page)
    }

    useEffect(() => {
        dispatch(getAllUsers(currentPageNo))
    }, [dispatch,currentPageNo])

    // Access users data from state
    const { loading, isAuthenticated, error, userList } = useSelector(
        (state) => state.authState
    );

    // Function to render table rows
    const TableTR = () => {
        return (
            userList?.data?.map((user, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                    <td className="px-6 py-4">
                        {user.status === 1 ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            ))
        );
    };

    const { totalUsers, totalPages, previousPage, currentPage, nextPage,limit } = userList?.pagination || {}

    return (
        <>
            <MetaData title={"All Users"} />
            <SideMenu noClass>
                <main className="py-14 w-3/4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableTR />
                            </tbody>
                        </table>
                        {/* Pagination component should go here */}
                        {totalPages > 1 && (
                            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{currentPage}-{userList.data.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalUsers}</span></span>
                                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                    {previousPage && (
                                        <li>
                                            <p className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                                        </li>
                                    )}
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index}>
                                            <p onClick={()=>getCurrentPageNumber(index + 1)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1
                                                ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                                }`}>
                                                {index + 1}
                                            </p>
                                        </li>
                                    ))}
                                    {nextPage && (
                                        <li>
                                            <p className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        )}
                    </div>
                </main>
            </SideMenu>
        </>
    )
}

export default ListUsers
