import { getVideoById, incrementViews, videoLike, videoLikeStatus } from "../features/video/videoService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import VideoPlayer from "../components/VideoPlayer"
import LikeButton from "../components/LikeButton"
import UserInfo from "../components/UserInfo";

function WatchVideo(){
    const [video, setvideo] = useState(null)
    const [like, setlike] = useState({
        likesCount: 0,
        isLiked: false
    })
    const { videoId } = useParams()
    const { isAuthenticated } = useSelector((state)=>state.auth)
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
        fetchVideo()
    },[videoId])
    
    useEffect(()=>{
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
    }, [videoId, isAuthenticated])
    if(!video){
        return  <h1>loading...</h1>
    }


    const handleLike = async () => {
        if(!isAuthenticated){
                toast.error("Please login first")
                return;
            }

        try {
            await videoLike(videoId)
            const response = await videoLikeStatus(videoId)
            setlike(response.data)
        } catch (error) {
            console.log("handelLike error message", error.response?.data?.message || error);
        }
    }
    return (
        <div className="max-w-5xl mx-auto">
            
            <VideoPlayer video={video}/>

            <UserInfo creator={video.creator}/>

            <LikeButton 
            like={like}
            hendelLike={handleLike}
            />

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