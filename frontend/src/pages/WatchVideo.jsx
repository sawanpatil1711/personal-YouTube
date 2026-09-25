import { getVideoById, incrementViews, videoLike, videoLikeStatus } from "../features/video/videoService"
import likeIcon from "../assets/like.png"
import likedIcon from "../assets/liked.png"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";

function WatchVideo(){
    const [video, setvideo] = useState(null)
    const [like, setlike] = useState({
        likesCount: 0,
        isLiked: false
    })
    const { videoId } = useParams()
    // console.log("video id",videoId)
    useEffect(() => {
        const fetchVideo = async ()=>{
            try {
                await incrementViews(videoId)
                const response = await getVideoById(videoId)
                setvideo(response.data)
            } catch (error) {
                console.log('error fatching wathVideo data', error)
            }
        }
        const fetchLikeStatus = async ()=>{
            try {
                const response = await videoLikeStatus(videoId)
                console.log("videolike status", response)
                setlike(response.data)
            } catch (error) {
                console.log('error fatching wathVideo data', error)
            }
        }
        fetchLikeStatus()
        fetchVideo()
    },[videoId])
    if(!video){
        return  <h1>loading...</h1>
    }


    const hendelLike = async () => {
        try {
            await videoLike(videoId)
            const response = await videoLikeStatus(videoId)
            setlike(response.data)
        } catch (error) {
            console.log("hendelLike error", error)
        }
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

            <div className="flex items-center gap-3 mt-4">
                <img
                    src={video.creator.avatar}
                    alt={video.creator.username}
                    className="w-12 h-12 rounded-full"
                />

                <div>
                    <h3 className="font-semibold">
                        {video.creator.username}
                    </h3>
                </div>
            </div>

            <button
                onClick={hendelLike}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg"
            >
                <img
                    src={like.isLiked ? likedIcon : likeIcon}
                    alt="like"
                    className="w-6 h-6"
                />

                <span>{like.likesCount}</span>
            </button>

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