import api from "../../api/axios";

export const getComment = async (videoId) => {
    const response = await api.get(`/comments/${videoId}`)
    return response.data
}

export const addComment = async (videoId, userComment) => {
    const response = await api.post(`/comments/${videoId}`, {userComment})
    return response.data
}

export const UpdateComment = async (commentId, newComment) => {
    const response = await api.patch(`/comments/${commentId}`, {newComment})
    return response.data
}

export const deleteComment = async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`)
    return response.data
}

export const commentLike = async (commentId) => {
    
    const response = await api.post(`/likes/c/${commentId}`)
    return response.data
    
}