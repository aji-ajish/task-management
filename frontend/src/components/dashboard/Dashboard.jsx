
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../layouts/SideMenu";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearAuthError } from "../../actions/userAction";

export default function Dashboard() {
    const dispatch = useDispatch();
    const {message } = useSelector(
        (state) => state.authState
      );

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
              dispatch(clearAuthError);
            },
          });
          return;
        }
      }, [message, dispatch]);

    return (
      <>
        <SideMenu>
Hom
        </SideMenu>
      </>
    )
}
