import likeIcon from "../assets/like.png"
import likedIcon from "../assets/liked.png"

function LikeButton({like, hendelLike}) {
  

return (
    <button
        onClick={hendelLike}
        aria-label={like.isLiked ? "Unlike" : "Like"}
        aria-pressed={like.isLiked}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2
            text-sm font-medium transition-all duration-200
            active:scale-95
            ${
                like.isLiked
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
    >
        <img
            src={like.isLiked ? likedIcon : likeIcon}
            alt=""
            className="h-5 w-5 object-contain transition-transform duration-200"
        />

        <span>{like.likesCount ?? 0}</span>
    </button>
);


}

export default LikeButton;
