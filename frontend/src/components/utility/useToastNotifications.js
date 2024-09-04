// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";// Adjust the import according to your setup
// import { clearAuthError } from "../../actions/userAction";

// const useToastNotifications = (error, message) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const toastOptions = {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//             theme: "dark",
//             onOpen: () => dispatch(clearAuthError),
//         };

//         if (error) {
//             toast.error(error, toastOptions);
//         }

//         if (message) {
//             toast.success(message, toastOptions);
//         }
//     }, [error, message,dispatch]);
// };

// export default useToastNotifications;
