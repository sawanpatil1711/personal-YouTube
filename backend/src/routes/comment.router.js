import { Router } from "express";
import { verifyJWT } from "../middileware/auth.middileware.js";
import { getComment, addComment, deleteComment,updateComment } from "../controllers/comment.controller.js";

const router = Router()

router.route("/:videoId").get(getComment).post(verifyJWT, addComment)

router.route("/:commentId").patch(verifyJWT, updateComment).delete(verifyJWT, deleteComment)

export default router