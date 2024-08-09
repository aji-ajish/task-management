import MetaData from "../layouts/MetaData";
import ProfileDropDown from "../layouts/ProfileDropDown";
import SideMenu from "../layouts/SideMenu";
import avatar from '../../assets/dummyAvatar.png'
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector(state => state.authState)

  return (
    <>
      <MetaData title={`${user.name} Profile`} />
      <SideMenu>
        {/* <section className="w-full h-screen flex flex-col items-center justify-center px-4"> */}
          <div className="max-w-sm w-full dark:text-white border border-white  p-2 rounded-lg">
            <ProfileDropDown userId={user.name}/>
            <div className="flex flex-col items-center pb-10 capitalize">
              <img
                className="w-32 h-32 mb-3 rounded-full shadow-lg"
                src={user.image ? `${process.env.API_URL}/${user.image}` : avatar}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.role}
              </span>
            </div>

            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Email </dt>
                <dd className="text-lg font-semibold"> {user.email}</dd>
              </div>
              <div className="flex flex-col pt-3">
                <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Phone</dt>
                <dd className="text-lg font-semibold"> {user.phone}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400 capitalize">Address</dt>
                <dd className="text-lg font-semibold"> {user.address}</dd>
              </div>

            </dl>

          </div>
        {/* </section> */}
      </SideMenu>
    </>
  );
}
