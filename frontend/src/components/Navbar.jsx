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
        <header className="h-14 border-b flex items-center justify-between px-4">
            <Link to="/" className="text-xl font-bold"> YouTube Clone</Link>
            <div>
                {isAuthenticated ? (<button onClick={handleLogout}>Logout</button>) : (<div><Link to="/login">Login</Link>/<Link to="/register">Register</Link></div>)}
            </div>
        </header>
    )    
}

export default Navbar