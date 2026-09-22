import { formatDistanceToNow } from "date-fns"

function VideoCard({video}) {
    console.log("videoCard",video)
    return(
        <div  className="border rounded-lg overflow-hidden">
            <img className="h-48 bg-gray-300" src={video.thumbnail} alt={video.title} />
            
            <div className="p-3">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.creator.username}</p>
                <p className="text-sm text-gray-500">{video.views} • {formatDistanceToNow(new Date(video.createdAt), {addSuffix: true})}</p>
            </div>
        </div>
    )
}

export default VideoCard