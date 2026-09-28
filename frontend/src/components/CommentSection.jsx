import { useState, useEffect } from "react"
import { getComment, addComment } from "../features/comment/commentService"
import UserInfo from "./UserInfo"

function CommentSection(videoId){
    const [comments, setComments]= useState([])
    const [userComment, setUserComment] = useState("")
    useEffect(()=>{
        const fatchComment = async () => {
            try {
                const response = await getComment(videoId.videoId)
                setComments(response.data)
            } catch (error) {
                console.log("error fatching comment",error)
            }
        }
        fatchComment()
    },[videoId])

    const handleComment = async () => {
        try {
            await addComment(videoId.videoId, userComment)
            setUserComment("")
            const response = await getComment(videoId.videoId)
            setComments(response.data)
        } catch (error) {
            console.log("error handling user comment", error)
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

                        <p>
                            {comment.content}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default CommentSection