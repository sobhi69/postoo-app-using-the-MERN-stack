import express from 'express'
import {
    createOnePost,
    deleteOnePost,
    getOnePostMidll,
    getPosts,
    patchOnePost,
    retrieveOnePost
} from '../controllars/post'
const router = express.Router()
import upload from '../middleware/multer'

router.get('/get-posts', getPosts)
router.post('/create', upload.single('file'), createOnePost)
router.route("/:id")
    .get(getOnePostMidll, retrieveOnePost)
    .patch(getOnePostMidll, upload.single('file'),patchOnePost)
    .delete(getOnePostMidll, deleteOnePost)


export default router