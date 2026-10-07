import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getChannelProfile } from "../features/auth/authService.js"
import { getChannelVideos } from "../features/video/videoService.js"

import VideoCard from "../components/VideoCard.jsx";

function ChannelPage(){
    const { username } = useParams()

    const [channelProfile, setChannelProfile] = useState(null)
    const [channelVideos, setChannelVideos] = useState([])

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const profileResponse = await getChannelProfile(username)
                setChannelProfile(profileResponse.data)

                const videosResponse = await getChannelVideos(username)
                setChannelVideos(videosResponse.data.videos)
            } catch (error) {
                console.error("Error fetching channel data:", error)
            }
        }

        fetchChannelData()
    }, [username])

    if(!channelProfile){
        return <h1>Loading...</h1>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">

            {/* Cover Image */}
            <div className="relative">
                <img
                    src={channelProfile.coverImage}
                    alt="cover"
                    className="w-full h-56 md:h-72 object-cover rounded-2xl shadow-md"
                />
            </div>

            {/* Channel Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mt-[-40px] md:mt-[-50px] relative z-10">

                <img
                    src={channelProfile.avatar}
                    alt={channelProfile.username}
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                />

                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {channelProfile.username}
                    </h1>

                    <p className="text-gray-600 mt-1">
                        {channelProfile.fullname}
                    </p>

                    <p className="text-gray-500 mt-1">
                        {channelProfile.subscribersCount} Subscribers
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-b mt-6"></div>

            {/* Videos Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">
                    Videos
                </h2>

                {
                    channelVideos.length > 0 ? (
                        <div  className="grid grid-cols-3 gap-4">
                            {
                                channelVideos.map((video) => (
                                    <VideoCard
                                        key={video._id}
                                        video={video}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-xl p-8 text-center">
                            <p className="text-gray-500 text-lg">
                                No videos uploaded yet.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    ); 
}

export default ChannelPage