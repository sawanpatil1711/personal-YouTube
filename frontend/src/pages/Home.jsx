import VideoCard from "../components/VideoCard"
import { getAllVideos } from "../features/auth/authService.js"

function Home(){

    const response= getAllVideos()
    console.log("video data",response)
    return(
        <> 
            {/* <Navbar/> */}
        
        <div className="grid grid-cols-3 gap-4">
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
        </div>
        </>
    )
}

export default Home