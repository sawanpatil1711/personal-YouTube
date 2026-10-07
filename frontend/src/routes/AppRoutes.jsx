import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx"
import Profile from "../pages/Profile.jsx";
import LikedVideos from "../pages/LikedVideos.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import WatchVideo from "../pages/watchVideo.jsx";
import ChannelPage from "../pages/ChannelPage.jsx";

function AppRoutes(){
    return(

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:videoId" element={<WatchVideo />} />
            <Route path="/channel/:username" element={<ChannelPage />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                } />
                <Route path="/liked-videos" element={
                    <ProtectedRoute>
                        <LikedVideos/>
                    </ProtectedRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes