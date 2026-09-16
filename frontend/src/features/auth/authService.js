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