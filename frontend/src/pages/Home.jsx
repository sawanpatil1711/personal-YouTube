import { useState, useEffect } from "react"
import VideoCard from "../components/VideoCard"
import { getAllVideos } from "../features/video/videoService.js"

function Home(){

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos  = async () => {
            try {
                const response = await getAllVideos()
                setVideos(response.data.videos)
            } catch (error) {
                console.log("Error fetching current user:", error)
            }
        }
        fetchVideos()
    },[])
    // console.log(videos)
    return(
        <> 
            {/* <Navbar/> */}
        
        <div className="grid grid-cols-3 gap-4">
            {
                videos.map((video)=>(
                    <VideoCard
                    key={video._id}
                    video={video}
                    />
                ))
            }
        </div>
        </>
    )
}

export default Home