import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout(){
    return(
         <div className="min-h-screen">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout