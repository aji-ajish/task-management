import { useRef } from "react";
import { Link } from "react-router-dom";

export default function ProfileDropDown({userId}) {
  const dropDown1 = useRef();

  const SubmenuOpen = () => {
    if (dropDown1.current.classList.contains("hidden")) {
      dropDown1.current.classList.remove("hidden");
      dropDown1.current.classList.add("block");
    } else {
      dropDown1.current.classList.add("hidden");
      dropDown1.current.classList.remove("block");
    }
  };

  return (
    <div className="flex justify-end px-4 pt-4">
      <button
        onClick={SubmenuOpen}
        className="inline-block outline-none text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700  focus:outline-none rounded-lg text-sm p-1.5"
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        ref={dropDown1}
        className="z-10 -mr-44 -mb-14 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul className="py-2">
          <li>
            <Link to={`/profile/${userId}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <Link to={`/changePassword/${userId}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Change Password
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
