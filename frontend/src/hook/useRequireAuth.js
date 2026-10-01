// hooks/useRequireAuth.js

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function useRequireAuth() {
    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return () => {
        if (!isAuthenticated) {
            toast.error("Please login first");
            return false;
        }

        return true;
    };
}

export default useRequireAuth;