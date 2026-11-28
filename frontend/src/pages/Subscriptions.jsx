import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { subscribedChannel } from '../features/subscription/subscriptionService';
import UserInfo from '../components/UserInfo';
import SubscribeButton from '../components/SubscribeButton';

function Subscriptions() {

    const [subscribedChannels, setSubscribedChannels] = useState([])
    const userId = useSelector((state) => state.auth.user?._id)

    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            try {
                const response = await subscribedChannel(userId)
                setSubscribedChannels(response.data)
            } catch (error) {
                console.log("error while fetching subscribed channels", error)
            }
        }
        fetchSubscribedChannels()
    }, [userId])
    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-8">

            {/* Page Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    All Subscriptions
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    Manage all the channels you have subscribed to.
                </p>
                <div className="border-b border-gray-200 mt-5"></div>
            </div>

            {/* Subscription List */}
            <div className="max-w-5xl mx-auto flex flex-col gap-4">

                {subscribedChannels.length > 0 ? (
                    subscribedChannels.map((channel) => (
                        <div
                            key={channel.channel._id}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
                        >
                            {/* Channel Info */}
                            <div className="flex items-center gap-4">
                                <div className="shrink-0">
                                    <UserInfo creator={channel.channel} />
                                </div>
                            </div>

                            {/* Subscribe Button */}
                            <div className="sm:shrink-0">
                                <SubscribeButton
                                    creatorChannelId={channel.channel._id}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-gray-200 rounded-xl bg-gray-50">
                        <div className="text-5xl mb-4">📺</div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            No subscriptions yet
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Explore channels and subscribe to your favorites.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Subscriptions