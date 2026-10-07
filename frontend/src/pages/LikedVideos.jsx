import { useState, useEffect } from "react"
import { videoLikedByUser } from "../features/video/videoService"
import VideoCard from "../components/VideoCard"


function LikedVideos(){

    const [likedVideos, setLikedVideos] = useState([])

    useEffect(()=>{
        const fetchLikedVideos = async () => {
            try {
                const response = await videoLikedByUser()
                setLikedVideos(response.data.map((like) => like.video))
            } catch (error) {
                console.log("error fetching liked videos", error)
            }
        }
        fetchLikedVideos()
    },[])
    console.log("likedVideos", likedVideos)
    return(
        <>
            <div className="grid grid-cols-3 gap-4">
                {
                    likedVideos.length > 0 ? (
                        likedVideos.map((video)=>(
                            <VideoCard
                                key={video._id}
                                video={video}
                            />
                        ))
                    ) : (
                        <p>No liked videos found.</p>
                    )
                }
            </div>
        </>
    )
}

export default LikedVideos