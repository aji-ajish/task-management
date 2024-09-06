import { useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import SideMenu from '../layouts/SideMenu'
import SmallLoader from '../layouts/SmallLoader';
import dummyAvatar from '../../assets/dummyAvatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addUser, clearAuthError } from '../../actions/userAction';

const NewUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('user');
    const [userStatus, setUserStatus] = useState(0);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(dummyAvatar);


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, message } = useSelector(
        (state) => state.authState
    );



    const onChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name);
        data.append('password', name);
        data.append('email', email);
        data.append('phone', phone);
        data.append('address', address);
        data.append('status', userStatus ? 1 : 0);
        data.append('role', role);
        if (avatar) {
            data.append('image', avatar);
        }


        dispatch(addUser(data))

    };

    useEffect(() => {
        if (!loading && message) {
            navigate('/allUsers');
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

    }, [loading, message, navigate, dispatch]);

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
    }, [error, dispatch])


    return (
        <>
            <MetaData title={"Add New User"} />
            <SideMenu>
                <main className="py-14 w-3/4 pt-1">
                    <div className={`${'relative overflow-x-auto shadow-md sm:rounded-lg max-h-full'}`}>
                        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                            <div className="max-w-screen-xl mx-auto px-4 dark:text-white md:px-8">
                                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                                    <p className="text-3xl font-semibold sm:text-4xl">
                                        Add New User
                                    </p>
                                </div>
                                <div className="mt-4 max-w-lg mx-auto">
                                    <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
                                        <div>
                                            <label className="font-medium">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">Phone</label>
                                            <input
                                                type="text"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">Address</label>
                                            <textarea
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                                value={address}
                                                className="w-full mt-2 h-20 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            ></textarea>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6 justify-center items-center">
                                            <div>
                                                <label className="font-medium">Role</label>
                                                <select required
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
                                                    <option value='admin'>Admin</option>
                                                    <option value='user'>User</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="font-medium">User Status</label>
                                                <div className="flex items-center  py-2 ml-5">
                                                    <input id="default-checkbox" type="checkbox" checked={userStatus} value={1} onChange={() => setUserStatus(!userStatus)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-none outline-none rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 " />
                                                    <label htmlFor="default-checkbox" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">
                                                        {userStatus ? 'Active' : 'InActive'}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-28 rounded-lg border-2 border-dashed flex items-center justify-center w-full">
                                            <label htmlFor="file" className="cursor-pointer text-center p-4 md:m-8">
                                                <svg className="w-8 h-9 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your profile</span> or drag and drop your file here</p>
                                            </label>
                                            <input
                                                id="file"
                                                type="file"
                                                className="hidden"
                                                onChange={onChangeAvatar}
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
                                                "Submit"
                                            )}

                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md justify-center content-center">
                                <img
                                    className="w-48 h-48 mb-3 rounded shadow-lg bg-slate-600"
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </SideMenu>
        </>
    )
}

export default NewUser