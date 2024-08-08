
import MetaData from "../layouts/MetaData";
import SideMenu from "../layouts/SideMenu";
import { useSelector } from "react-redux";
import dummyAvatar from '../../assets/dummyAvatar.png'
import { useState } from "react";


export default function EditProfile() {
    const { user } = useSelector(state => state.authState)
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(dummyAvatar)

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <>
            <MetaData title={"Edit Profile"} />
            <SideMenu>
                <main className="py-14">
                    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                            <div className="max-w-screen-xl mx-auto px-4 dark:text-white md:px-8">
                                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                                    <p className="text-3xl font-semibold sm:text-4xl">
                                        Edit Profile
                                    </p>
                                </div>
                                <div className="mt-12 max-w-lg mx-auto">
                                    <form
                                        onSubmit={(e) => e.preventDefault()}
                                        className="space-y-5 "
                                    >
                                        <div>
                                            <label className="font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={user.name}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={user.email}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Phone
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={user.phone}
                                                className="w-full mt-2 px-3 py-2 dark:text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Message
                                            </label>
                                            <textarea required value={user.address} className="w-full mt-2 h-20 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                                        </div>
                                        <div className=" h-28 rounded-lg border-2 border-dashed flex items-center justify-center w-full" onChange={onChangeAvatar}>
                                            <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                                                <svg className="w-8 h-9 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  profile</span> or drag and drop your file here</p>
                                            </label>
                                            <input id="file" type="file" className="hidden" />
                                        </div>
                                        <button
                                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                        >
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md justify-center content-center">
                                <img
                                    className="w-48 h-4w-48 mb-3 rounded- shadow-lg  bg-slate-600"
                                    src={user.image ? user.image : avatarPreview}
                                    alt="Bonnie image"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </SideMenu>
        </>
    )
}
