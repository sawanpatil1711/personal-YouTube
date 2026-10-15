import api from "../../api/axios";

export const subscribedChannel = async (subscriberId) => {
    const response = await api.get(`/subscriptions/u/${subscriberId}`)
    return response.data
}

export const channelSubscribers = async (channelId) => {
    const response = await api.get(`/subscriptions/c/${channelId}`)
    return response.data
}

export const toggleSubscription = async (channelId) => {
    const response = await api.post(`/subscriptions/c/${channelId}`)
    return response.data
}