import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx"

function AppRoutes(){
    return(

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default AppRoutes