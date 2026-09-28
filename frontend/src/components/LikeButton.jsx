import likeIcon from "../assets/like.png"
import likedIcon from "../assets/liked.png"

function LikeButton({like, hendelLike}) {
  
  return (
    <button
      onClick={hendelLike}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg"
    >
      <img
        src={like.isLiked ? likedIcon : likeIcon}
        alt="like"
        className="w-6 h-6"
      />

      <span>{like.likesCount}</span>
    </button>
  );
}

export default LikeButton;
