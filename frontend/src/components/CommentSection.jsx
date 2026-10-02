import { useState, useEffect } from "react"
import { getComment, addComment, deleteComment, commentLike} from "../features/comment/commentService"
import UserInfo from "./UserInfo"
import { useSelector } from "react-redux"
import useRequireAuth from "../hook/useRequireAuth"
import LikeButton from "./LikeButton"

function CommentSection({videoId}){
    const [comments, setComments]= useState([])
    const [userComment, setUserComment] = useState("")
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
    return(
        <div>
            <h2>Comments</h2>

            <input type="text" 
            value={userComment} 
            onChange={(e)=>{setUserComment(e.target.value)}} 
            placeholder="Add Comment"
            />
            <button onClick={handleComment}>Comment</button>

            
            {
                comments.map((comment)=>(
                    <div
                        key={comment._id}
                        className="border-b py-3"
                    >
                        <UserInfo creator={comment.owner}/>

                        {user && comment.owner._id === user._id && (
                            <button onClick={()=>handleDelete(comment._id)} className="text-red-500" >Delete</button>
                        )}

                        <p>
                            {comment.content}
                        </p>

                        <LikeButton
                            like={{
                                likesCount: comment.likesCount,
                                isLiked: comment.isLiked
                            }}
                            hendelLike={() =>
                                handleLike(comment._id)
                            }
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default CommentSection