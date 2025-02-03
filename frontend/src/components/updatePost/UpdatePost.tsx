import axios from 'axios'
import { FC, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Post } from '../postoo/Postoo'
import './updatePost.css'

const UpdatePost: FC= ({ }) => {
    
    const [currPost, setCurrPost] = useState<Post>({
        title: "",
        description: "",
        _id: 0,
        imgUrl: ""
    })

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    const params = useParams()
    const navigate = useNavigate()
    const id = params.id

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3011/post/${id}`)
                const data = response.data
                setCurrPost(data)
            } catch (error) {
                alert(error)
            }
        }
        getPost()
        return
    }, [])


    const updateCurrPost = (prop: any) => {
        setCurrPost(prev => {
            return { ...prev, ...prop }
        })
    }

    const changeImg = (e: FormEvent) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        const file = target.files[0]
        setImgFile(file)
        const url = URL.createObjectURL(file)
        setCurrPost(prev => {
            return { ...prev, imgUrl: url }
        })

    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault()
        if (!currPost.title) {
            alert("the title can't be empty!")
            return
        }
        setLoading(true)

        const formData = new FormData()

        formData.append('title', currPost.title)
        formData.append('description', currPost.description || '')
        formData.append('file', imgFile || "")

        try {
            await axios.patch(`http://localhost:3011/post/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            navigate('/')
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }

    }
    
    return (
        <div className='update-page'>
            <h1>postoo</h1>
            <h2>update post page</h2>
            <div className='update-post post'>
                <form onSubmit={(e) => handleUpdate(e)}>
                    {!loading ? (
                        <>
                            <div className="group-form">
                                <label htmlFor="title">title</label>
                                <input
                                    value={currPost.title}
                                    onChange={(e) => updateCurrPost({ title: e.target.value })}
                                    type="text"
                                    id='title'
                                    placeholder='new title' />
                            </div>
                            <div className="group-form">
                                <label htmlFor="description">description</label>
                                <input
                                    onChange={(e) => updateCurrPost({ description: e.target.value })}
                                    value={currPost.description}
                                    type="text"
                                    id='description'
                                    placeholder='optinal' />
                            </div>
                            <div className="group-form">
                                <label className='update-img' htmlFor="newImg">update img</label>
                                <input
                                    onChange={(e) => changeImg(e)}
                                    type="file"
                                    style={{ display: "none" }}
                                    id="newImg" />
                            </div>
                            <input className='update-btn' type="submit" value="Update" />
                        </>
                    ) :"updating..."}
                </form>
                <img src={currPost.imgUrl} alt="" />
            </div>
        </div>
    )
}

export default UpdatePost;