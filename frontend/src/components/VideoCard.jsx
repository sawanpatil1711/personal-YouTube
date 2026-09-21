function VideoCard() {
    return(
        <div  className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-300">thumbnail</div>
            <div className="p-3">
                <h3 className="font-semibold">title</h3>
                <p className="text-sm text-gray-500">sawan patil</p>
                <p className="text-sm text-gray-500">12K views • 2 days ago</p>
            </div>
        </div>
    )
}

export default VideoCard