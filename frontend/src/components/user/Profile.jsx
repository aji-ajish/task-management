import MetaData from "../layouts/MetaData";
import ProfileDropDown from "../layouts/ProfileDropDown";

export default function Profile() {
  return (
    <>
      <MetaData title={"Profile"} />
      <section className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full dark:text-white border border-white  p-7 rounded-lg">
          <ProfileDropDown/>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-32 h-32 mb-3 rounded-full shadow-lg"
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Admin
            </span>
            
          </div>
        </div>
      </section>
    </>
  );
}
