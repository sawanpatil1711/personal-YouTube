import { useEffect, useState } from 'react'
import { getUserWatchHistory } from "../features/auth/authService.js"
import VideoCard from "../components/VideoCard.jsx"

const WatchHistory = () => {
    const [watchedVideo, setWatchedVideo] = useState([])

    useEffect(()=>{
        const fetchWatchHistory = async () => {
            try {
                const response = await getUserWatchHistory()
                setWatchedVideo(response.data)
            } catch (error) {
                console.log("error while faching watch history", error)
            }
        }
        fetchWatchHistory()
    }, [])
  return (
    <>
        <div className="grid grid-cols-3 gap-4">
                {
                    watchedVideo.length > 0 ? (
                        watchedVideo.map((video)=>(
                            <VideoCard
                                key={video._id}
                                video={video}
                            />
                        ))
                    ) : (
                        <p>No watched videos found.</p>
                    )
                }
        </div>        
    </>
  )
}

export default WatchHistory