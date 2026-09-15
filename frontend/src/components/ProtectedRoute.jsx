import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {isAuthenticated, loading} = useSelector((state)=>state.auth)

    console.log("ProtectedRoute:", isAuthenticated);

    if(loading){
        console.log("loading state", loading)
        return <h1>Loading...</h1>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute