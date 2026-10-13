import { getVideoById, incrementViews, videoLike, videoLikeStatus } from "../features/video/videoService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import useRequireAuth from "../hook/useRequireAuth"
import VideoPlayer from "../components/VideoPlayer"
import LikeButton from "../components/LikeButton"
import UserInfo from "../components/UserInfo";
import CommentSection from "../components/CommentSection";

function WatchVideo(){
    const [video, setvideo] = useState(null)
    const [like, setlike] = useState({
        likesCount: 0,
        isLiked: false
    })
    const { videoId } = useParams()
    const { isAuthenticated } = useSelector((state)=>state.auth)
    const requireAuth = useRequireAuth()
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
        if (!requireAuth()) return;

        try {
            await videoLike(videoId)
            const response = await videoLikeStatus(videoId)
            setlike(response.data)
        } catch (error) {
            console.log("handelLike error message", error.response?.data?.message || error);
        }
    }
    return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
            
            {/* Main Content */}
            <div className="max-w-5xl mx-auto">

                {/* Video Player */}
                <div className="overflow-hidden rounded-xl bg-black shadow-sm">
                    <VideoPlayer video={video} />
                </div>

                {/* Video Title */}
                <h1 className="mt-5 text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {video.title}
                </h1>

                {/* Creator and Like Button */}
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    
                    <div className="min-w-0">
                        <UserInfo creator={video.creator} />
                    </div>

                    <div className="flex shrink-0 items-center">
                        <LikeButton
                            like={like}
                            hendelLike={handleLike}
                        />
                    </div>
                </div>

                {/* Video Statistics */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                        {Number(video.views || 0).toLocaleString("en-IN")} views
                    </span>

                    <span className="text-gray-400">•</span>

                    <span>
                        {formatDistanceToNow(
                            new Date(video.createdAt),
                            { addSuffix: true }
                        )}
                    </span>
                </div>

                {/* Description */}
                <div className="mt-5 rounded-xl bg-gray-100 p-4 sm:p-5">
                    <h2 className="mb-2 text-base font-semibold text-gray-900">
                        Description
                    </h2>

                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                        {video.description || "No description available."}
                    </p>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-200" />

                {/* Comments */}
                <section className="pb-10">
                    <h2 className="mb-5 text-xl font-bold text-gray-900">
                        Comments
                    </h2>

                    <CommentSection videoId={videoId} />
                </section>

            </div>
        </div>
    </div>
);
}

export default WatchVideo