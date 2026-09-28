import api from "../../api/axios";

export const getComment = async (videoId) => {
    const response = await api.get(`/comments/${videoId}`)
    return response.data
}

export const addComment = async (videoId, userComment) => {
    const response = await api.post(`/comments/${videoId}`, {userComment})
    return response.data
}