import { useState, useEffect } from "react"
import { getComment, addComment, UpdateComment, deleteComment, commentLike} from "../features/comment/commentService"
import UserInfo from "./UserInfo"
import { formatDistanceToNow } from "date-fns"
import { useSelector } from "react-redux"
import useRequireAuth from "../hook/useRequireAuth"
import LikeButton from "./LikeButton"

function CommentSection({videoId}){
    const [comments, setComments]= useState([])
    const [userComment, setUserComment] = useState("")
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingCommentContent, setEditingCommentContent] = useState("")
    const { user } = useSelector((state) => state.auth)
    const requireAuth = useRequireAuth()

    useEffect(()=>{
        const fatchComment = async () => {
            try {
                const response = await getComment(videoId)
                setComments(response.data)
            } catch (error) {
                console.log("error fatching comment",error)
            }
        }
        fatchComment()
    },[videoId])

    const handleComment = async () => {
        try {
            if (!requireAuth()) return;
            await addComment(videoId, userComment)
            setUserComment("")
            const response = await getComment(videoId)
            setComments(response.data)
        } catch (error) {
            console.log("error handling user comment", error)
        }
    }

    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId)
            setComments(
                comments.filter(
                    (comment) =>
                        comment._id !== commentId
                )
            )
        } catch (error) {
            console.log("error deleting comment", error)
        }
    }

    const startEditing = (comment) => {
        setEditingCommentId(comment._id)
        setEditingCommentContent(comment.content)
    }

    const handleUpdate = async (commentId) => {
        try {
            await UpdateComment(commentId, editingCommentContent)
            setComments(
                comments.map((comment) =>
                    comment._id === commentId ? { ...comment, content: editingCommentContent } : comment
                )
            )
            setEditingCommentId(null)
            setEditingCommentContent("")
        } catch (error) {
            console.log("error updating comment", error)
            console.log("Message:", error.response?.data?.message);
        }
    }

    const handleLike = async (commentId) =>{
        try {
            if (!requireAuth()) return;
            await commentLike(commentId)
            const response = await getComment(videoId)
            setComments(response.data)
        } catch (error) {
            console.log("error handling comment like", error)
        }
    }

return (
    <div className="w-full text-gray-900">

        {/* Add Comment */}
        <div className="flex gap-3 mb-8">
            <div className="flex-1 min-w-0">
                <input
                    type="text"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && userComment.trim()) {
                            handleComment();
                        }
                    }}
                    placeholder="Add a comment..."
                    className="w-full border-b border-gray-300 bg-transparent pb-2 text-sm outline-none transition-colors focus:border-gray-900 placeholder:text-gray-500"
                />

                {userComment.trim() && (
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            onClick={() => setUserComment("")}
                            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleComment}
                            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            Comment
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Comments */}
        <div className="space-y-6">
            {comments.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                    No comments yet. Be the first to comment.
                </p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="flex gap-3">

                        {/* Avatar */}
                        <img
                            src={comment.owner?.avatar || "/default-avatar.png"}
                            alt={comment.owner?.username || "User"}
                            className="h-10 w-10 shrink-0 rounded-full object-cover bg-gray-200"
                        />

                        {/* Comment Body */}
                        <div className="min-w-0 flex-1">

                            {/* Username */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold">
                                    @{comment.owner?.username || "user"}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {comment.createdAt &&
                                        formatDistanceToNow(
                                            new Date(comment.createdAt),
                                            { addSuffix: true }
                                        )}
                                </span>
                            </div>

                            {/* Edit Mode */}
                            {editingCommentId === comment._id ? (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={editingCommentContent}
                                        onChange={(e) =>
                                            setEditingCommentContent(e.target.value)
                                        }
                                        className="w-full border-b border-gray-400 bg-transparent py-2 text-sm outline-none focus:border-blue-600"
                                        autoFocus
                                    />

                                    <div className="mt-2 flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(comment._id)}
                                            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingCommentId(null)}
                                            className="rounded-full px-4 py-2 text-xs font-medium hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6">
                                    {comment.content}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="mt-2 flex flex-wrap items-center gap-1">

                                <div className="[&_button]:!text-gray-600">
                                    <LikeButton
                                        like={{
                                            likesCount: comment.likesCount,
                                            isLiked: comment.isLiked,
                                        }}
                                        hendelLike={() =>
                                            handleLike(comment._id)
                                        }
                                    />
                                </div>

                                {user &&
                                    comment.owner?._id === user._id &&
                                    editingCommentId !== comment._id && (
                                        <>
                                            <button
                                                onClick={() => startEditing(comment)}
                                                className="rounded-full px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="rounded-full px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);


}

export default CommentSection