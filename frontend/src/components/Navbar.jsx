import { logoutUser } from "../features/auth/authService"
import { logout } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



function Navbar(){

    const {isAuthenticated} = useSelector((state)=>state.auth)
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
        <header className="h-14 border-b flex items-center px-4">
            <h1 className="text-xl font-bold"> YouTube Clone</h1>
            <div>
                {isAuthenticated ? (<button onClick={handleLogout}>Logout</button>) : (<Link to="/login">Login</Link>)}
            </div>
        </header>
    )    
}

export default Navbar