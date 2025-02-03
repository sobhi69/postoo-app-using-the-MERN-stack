import axios from 'axios'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { FaRegCircleXmark } from 'react-icons/fa6'
import { IoMdCheckmark } from 'react-icons/io'
import "./createPost.css"
import { Post } from '../postoo/Postoo'

interface CreatePostProps {
  updatePostsState(prop: Post):void 
}


interface PostForm {
  title: string,
  description?: string,
  img:File | undefined
}

const CreatePost: FC<CreatePostProps> = ({ updatePostsState}) => {

  const [postForm, setPostForm] = useState<PostForm>({
    title: "",
    description: "",
    img:undefined
  })


  const [isLoading, setIsloading] = useState<boolean>(false)

  const submitBtn = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if (postForm.img && postForm.title) {
      submitBtn.current?.classList.add('ready')
    } else {
      submitBtn.current?.classList.remove('ready')
    }
  }, [postForm])

  const updateForm = (prop: any) => {

    setPostForm(prev => {
      return { ...prev, ...prop }
    })
  }

  const handleChangeImg = (e: FormEvent) => {

    const target = e.target as HTMLInputElement & {
      files: FileList
    }

    setPostForm(prev => {
      return { ...prev, img: target.files[0] }
    })

  }

  // create a new post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    
    if (!postForm.title || !postForm.img) {
      alert("please provide a title and select an img")
    }
    if (!submitBtn.current?.className.includes('ready')){
      return
    }

    

    setIsloading(true)
    submitBtn.current?.classList.remove('ready')
    const formData = new FormData()
    formData.append('title', postForm.title)
    formData.append('description', postForm.description || '')
    formData.append('file', postForm.img || '')

    try {
      const response = await axios.post('http://localhost:3011/post/create', formData)
      const data = await response.data
      
      updatePostsState(data)
      setPostForm({ title: "", description: "", img: undefined })
    } catch (error) {
      alert(error)
    } finally {
      setIsloading(false)
    }
    
  }


  return (
    <div className="create-post">
      <h3>Create new Post</h3>
      <form onSubmit={(e) => handleSubmit(e)}  >
        <div className="group-form">
          <label htmlFor="title">Title</label>
          <input
            value={postForm.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            placeholder='post title'
            type="text"
            id='title' />
        </div>

        <div className="group-form">
          <label htmlFor="description">Description</label>
          <input
            value={postForm.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            placeholder='optional'
            type="text"
            id='description' />
        </div>

        <div className="group-form group-file">
          <label className='upload-img' htmlFor="img">upload img</label>
          <input
            onChange={(e) => handleChangeImg(e)}
            style={{ display: "none" }}
            placeholder='optional'
            type="file"
            id='img' />
          {postForm.img ? <IoMdCheckmark color='green' /> : <FaRegCircleXmark color='red' />}
        </div>

        <input
          ref={submitBtn}
          className={`submit-btn`}
          type="submit"
          value="Create" />
        {isLoading ? "Loading..." : ""}
      </form>
    </div>
  )
}

export default CreatePost;