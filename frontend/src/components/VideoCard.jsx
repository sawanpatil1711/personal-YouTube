import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"

function VideoCard({video}) {
    return(
        <Link to={`/video/${video._id}`}>
        <div className="group border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
        {/* Video Thumbnail Wrapper */}
        <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
            <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
            src={video.thumbnail} 
            alt={video.title} 
            />
        </div>
        
        {/* Video Details */}
        <div className="p-4">
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug text-base mb-1 group-hover:text-blue-600 transition-colors duration-200">
            {video.title}
            </h3>
            <p className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150">
            {video.creator.username}
            </p>
            <p className="text-xs text-gray-400 mt-1">
            {video.views} views • {formatDistanceToNow(new Date(video.createdAt), {addSuffix: true})}
            </p>
        </div>
        </div>

        </Link>
    )
}

export default VideoCard