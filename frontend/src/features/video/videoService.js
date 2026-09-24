import api from "../../api/axios";

export const getAllVideos = async () => {
    const response = await api.get("/videos/")
    return response.data
}

export const getVideoById = async (videoId) => {
    const response = await api.get(`/videos/${videoId}`)
    return response.data
}

export const incrementViews = async (videoId) => {
    await api.patch(`/videos/${videoId}/views`)
}