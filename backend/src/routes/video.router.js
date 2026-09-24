import { Router } from "express";
import { uploadVideo, getAllVideos, getVideoById, deleteVideoById, updateVideoById, incrementViews } from "../controllers/video.controller.js";
import { verifyJWT } from "../middileware/auth.middileware.js";
import { upload } from "../middileware/multer.middileware.js";

const router = Router()

// router.use(verifyJWT)
console.log("Video router loaded");

router.route('/uploadVideo').post(verifyJWT, upload.fields([
    {
        name: 'videoFile',
        maxCount: 1
    },
    {
        name: 'thumbnail',
        maxCount: 1
    }
]),uploadVideo)

router.route('/').get(getAllVideos)

router
    .route('/:videoId/views')
    .patch(incrementViews);

router.route('/:videoId')
.delete(verifyJWT, deleteVideoById)
.get(getVideoById)
.patch(verifyJWT, upload.single('thumbnail'),updateVideoById)


export default router