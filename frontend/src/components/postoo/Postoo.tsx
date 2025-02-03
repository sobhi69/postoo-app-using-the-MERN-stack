import { FC, useEffect, useState } from 'react'
import CreatePost from '../createPost/CreatePost';
import Posts from '../posts/Posts';
import axios from 'axios';
import './postoo.css'

export interface Post {
    title: string,
    description?: string,
    imgUrl: string,
    _id: number
}

const Postoo: FC = ({ }) => {
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3011/post/get-posts')
                const data = await response.data
                setPosts(data)

            } catch (error) {
                alert(error)
            }

        }

        getPosts()
        return
    }, [])


    const updatePostsState = (prop: Post) => {
        setPosts(prev => {
            return [...prev, prop]
        })
    }

    const deletePost = async (id: number) => {
        try {
            const filteredPosts = posts.filter(post => post._id != id)
            await axios.delete(`http://localhost:3011/post/${id}`)
            setPosts(filteredPosts)
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className="postoo">
            <h1>postoo</h1>
            <CreatePost updatePostsState={updatePostsState} />
            <Posts posts={posts} deletePost={deletePost} />
        </div>
    )
}

export default Postoo;