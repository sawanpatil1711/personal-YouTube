
function VideoPlayer({video}){

    return(
        <>        
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
        </>

    )
}
export default VideoPlayer