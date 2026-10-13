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
    return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">

        {/* Logo */}
        <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
        >
            <span className="flex items-center justify-center w-9 h-7 bg-red-600 rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                >
                    <path d="M8 5.14v13.72L19 12 8 5.14Z" />
                </svg>
            </span>

            <span>YouTube <span className="text-gray-500 font-medium"></span></span>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3">
            {isAuthenticated ? (
                <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition duration-200"
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition duration-200"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium hover:bg-blue-100 transition duration-200"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    </header>
)
}

export default Navbar