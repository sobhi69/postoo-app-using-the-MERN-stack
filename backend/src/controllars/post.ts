import { NextFunction, Request, Response } from "express";
import Post from "../interfaces/post";
import PostModel from '../model/post'
import cloudinary from "../lib/cloudinary";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.find()
        res.json(posts)
    } catch (error: any) {
        console.error(`error in getPosts ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const createOnePost = async (req: Request, res: Response) => {
    const { title, description }: Post = req.body
    const file = req.file
    if (!title) {
        res.status(400).json({ message: "please enter the title and select an img" })
        return
    }

    const cloudResponse = await cloudinary.uploader.upload(file?.path || '')

    const newPost = new PostModel({
        title,
        description,
        imgUrl: cloudResponse.secure_url,
        updateMode: true
    })


    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error: any) {
        console.error(`error in createOnePost ${error}`)
        res.status(500).json({ message: error.message })
    }

}

interface PostRequest extends Request {
    post?: any
}

export const getOnePostMidll = async (req: PostRequest, res: Response, next: NextFunction) => {
    let post
    const id = req?.params?.id
    try {
        post = await PostModel.findById(id)
        if (!post) {
            res.status(404).json({ message: "this post is no longer in DB" })
            return
        }
    } catch (error: any) {
        console.error(`error in getOnePostMidll ${error}`)
        res.status(500).json({ message: error.message })
    }

    req.post = post
    next()
}

export const retrieveOnePost = (req: PostRequest, res: Response) => {
    res.json(req.post)
}

export const deleteOnePost = async (req: PostRequest, res: Response) => {
    const post = req.post

    try {
        await PostModel.findByIdAndDelete(post._id)
        res.json({ message: `post with id ${post._id} has been deleted` })
    } catch (error: any) {
        console.error(`error in deleteOnePost ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const patchOnePost = async (req: PostRequest, res: Response) => {
    const { title, description }: Post = req.body
    const file = req.file
    const post = req.post

    if (title) {
        post.title = title
    }
    if (description || description == '') {
        post.description = description
    }

    if (file) {
        const cloudResponse = await cloudinary.uploader.upload(file?.path || '')
        post.imgUrl = cloudResponse.secure_url
    }

    try {
        await post.save()
        res.json(post)
    } catch (error: any) {
        console.error(`error pathOnePost ${error}`)
        res.status(500).json({ message: error.message })
    }
}

