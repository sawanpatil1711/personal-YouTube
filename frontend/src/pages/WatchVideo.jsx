import { getVideoById } from "../features/video/videoService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";

function WatchVideo(){
    const [video, setvideo] = useState(null)
    const { videoId } = useParams()
    console.log("video id",videoId)
    useEffect(() => {
        const fetchVideo = async ()=>{
            try {
                const response = await getVideoById(videoId)
                console.log("watch video data", response.data)
                setvideo(response.data)
            } catch (error) {
                console.log('error fatching wathVideo data', error)
            }
        }
        fetchVideo()
    },[videoId])
    if(!video){
        return  <h1>loading...</h1>
    }
    return (
        <div className="max-w-5xl mx-auto">
            <video
                controls
                className="w-full rounded-lg"
            >
                <source
                    src={video.videoFile}
                    type="video/mp4"
                />
            </video>

            <h1 className="text-2xl font-bold mt-4">
                {video.title}
            </h1>

            <div className="text-gray-500 mt-2">
                {video.views} views • {" "}
                {formatDistanceToNow(
                    new Date(video.createdAt),
                    { addSuffix: true }
                )}
            </div>

            <p className="mt-4">
                {video.description}
            </p>
        </div>
    );
}

export default WatchVideo