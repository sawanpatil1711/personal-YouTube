import api from "../../api/axios.js";

export const loginUser = async (data) => {
    const response = await api.post(
        "/users/login",
        data
    )
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get("/users/me")
    return response.data
}

export const logoutUser = async () => {
    const response = await api.post("/users/logout")
    return response.data
}

export const registerUser = async (formData) => {
    const response = await api.post(
        "/users/register",
        formData
    )
    return response.data
}

export const getChannelProfile = async (username) => {
    const response = await api.get(`/users/c/${username}`)
    return response.data
}

export const getUserWatchHistory = async () => {
    const response = await api.get("/users/watch-history")
    return response.data
}

export const addToWatchHistory = async (videoId) => {
    const response = await api.patch(`/users/watch-history/${videoId}`)
    return response.data
}