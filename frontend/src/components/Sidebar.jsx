import { Home, User, Upload, Film, History, Heart, ListVideo } from "lucide-react"; // Optional: Recommended icon library
import { Link, useLocation } from "react-router-dom"; // Assuming standard react-router setup

export default function Sidebar() {
  const location = useLocation();

  // Helper function to apply active styles based on current route
  const linkClass = (path) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${location.pathname === path 
      ? "bg-gray-100 text-gray-900 font-semibold" 
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
  `;

  return (
    <aside className="w-64 h-screen sticky top-0 left-0 border-r border-gray-200 bg-white p-4 flex flex-col justify-between overflow-y-auto hidden md:flex">
      <div className="flex flex-col gap-6">
        
        {/* Main Navigation Group */}
        <div className="flex flex-col gap-1">
          <Link to="/" className={linkClass("/")}>
            <Home className="w-5 h-5 text-gray-500" />
            <span>Home</span>
          </Link>
          <Link to="/subscriptions" className={linkClass("/subscriptions")}>
            <Film className="w-5 h-5 text-gray-500" />
            <span>Subscriptions</span>
          </Link>
          <Link to="/upload" className={linkClass("/upload")}>
            <Upload className="w-5 h-5 text-gray-500" />
            <span>Upload Video</span>
          </Link>
        </div>

        <hr className="border-gray-100" />

        {/* Library Group */}
        <div className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Library</p>
          <Link to="/profile" className={linkClass("/profile")}>
            <User className="w-5 h-5 text-gray-500" />
            <span>Your Channel</span>
          </Link>
          <Link to="/watch-history" className={linkClass("/watch-history")}>
            <History className="w-5 h-5 text-gray-500" />
            <span>Watch History</span>
          </Link>
          <Link to="/liked-videos" className={linkClass("/liked-videos")}>
            <Heart className="w-5 h-5 text-gray-500" />
            <span>Liked Videos</span>
          </Link>
          <Link to="/playlists" className={linkClass("/playlists")}>
            <ListVideo className="w-5 h-5 text-gray-500" />
            <span>Playlists</span>
          </Link>
        </div>

      </div>
    </aside>
  );
}
