import { logoutUser } from "../features/auth/authService"
import { logout } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


function Navbar(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()

            dispatch(logout())

            navigate("/login")

            console.log("logout successfully")

        } catch (error) {
            console.log("logout error: ", error)
        }
    }
    return(
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )    
}

export default Navbar