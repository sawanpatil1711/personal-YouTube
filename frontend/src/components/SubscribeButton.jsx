// import { toggleSubscription } from "../features/subscription/subscriptionService"
// import { getChannelProfile } from "../features/auth/authService" 
// import { useEffect, useState } from "react"

// function SubscribeButton({creatorChannelId}) {
//     const [isSubscribed, setIsSubscribed] = useState(false)


//     useEffect(() => {
//         const fetchSubscriptionStatus = async () => {
//             try {
//                 const response = await getChannelProfile(creatorChannelId)
//                 setIsSubscribed(response.data.isSubscribed)
//             } catch (error) {
//                 console.log("error fetching subscription Status", error)
//             }
//         }

//         fetchSubscriptionStatus()
//     }, [creatorChannelId])

//     const hendelSubscription = async () => {
//         try {
//             await toggleSubscription(creatorChannelId)
//             setIsSubscribed((previous) => !previous);
//         } catch (error) {
//             console.log("error while hendeling subscription", error.response?.data?.message || error);
//         }
//     }

//     return(
//         <>
//             <button onClick={hendelSubscription}>
//                 {isSubscribed ? "Unsubscribe" : "Subscribe"}
//             </button>
//         </>
//     )
// }

// export default SubscribeButton



import { toggleSubscription } from "../features/subscription/subscriptionService";
import { getChannelProfile } from "../features/auth/authService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function SubscribeButton({ creatorChannelId }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!creatorChannelId) return;

    let cancelled = false;

    const fetchSubscriptionStatus = async () => {
      try {
        const response = await getChannelProfile(
          creatorChannelId
        );

        if (!cancelled) {
          setIsSubscribed(
            response.data.isSubscribed
          );
        }
      } catch (error) {
        console.error(
          "Error fetching subscription status:",
          error
        );
      }
    };

    fetchSubscriptionStatus();

    return () => {
      cancelled = true;
    };
  }, [creatorChannelId]);

  const handleSubscription = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await toggleSubscription(creatorChannelId);

      setIsSubscribed((previous) => !previous);

      toast.success(
        isSubscribed
          ? "Unsubscribed successfully"
          : "Subscribed successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update subscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscription}
      disabled={loading || !creatorChannelId}
      className={`rounded-full px-5 py-2.5 font-medium transition-colors
        disabled:cursor-not-allowed disabled:opacity-60 ${
          isSubscribed
            ? "bg-gray-200 text-black hover:bg-gray-300"
            : "bg-black text-white hover:bg-gray-800"
        }`}
    >
      {loading
        ? "Please wait..."
        : isSubscribed
          ? "Subscribed"
          : "Subscribe"}
    </button>
  );
}

export default SubscribeButton;
