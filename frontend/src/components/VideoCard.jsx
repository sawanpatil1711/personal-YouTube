import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"

function VideoCard({video}) {
    return(
        <Link to={`/video/${video._id}`}>
        <div  className="border rounded-lg overflow-hidden">
            <img className="h-48 bg-gray-300" src={video.thumbnail} alt={video.title} />
            <div className="p-3">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.creator.username}</p>
                <p className="text-sm text-gray-500">{video.views} • {formatDistanceToNow(new Date(video.createdAt), {addSuffix: true})}</p>
            </div>
        </div>
        </Link>
    )
}

export default VideoCard