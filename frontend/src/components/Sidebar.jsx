import { Link } from "react-router-dom"

function Sidebar(){
    return(
        <aside className="w-64 h-full border-r p-4">
            <div className="flex flex-col gap-3">
                <Link to="/">Home</Link>
                <Link to="/profile">Your Channel</Link>
                <Link to="/upload">Upload Video</Link>
                <Link to="/subscriptions">Subscriptions</Link>
                <Link to="/watch-history">Watch History</Link>
                <Link to="/liked-videos">Liked Videos</Link>
                <Link to="/playlists">Playlists</Link>
            </div>
        </aside>
    )
}

export default Sidebar