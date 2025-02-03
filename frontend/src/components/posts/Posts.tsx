import { FC} from 'react'
import './posts.css'
import { HiMiniXMark } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
interface Post {
  title: string,
  description?: string,
  imgUrl: string,
  _id: number,
  updateMode?: boolean
}
interface PostsProps {
  posts: Post[],
  deletePost(id: number): void
}

const Posts: FC<PostsProps> = ({ posts, deletePost }) => {

  return (
    <div className='posts'>
      {!posts.length ? "no posts to show" : posts.map((post, index) => (
        <div className='post' key={index}>
          <div className="actions">
            <Link to={`/update/${post._id}`}><FaEdit width={"100%"} color='blue' /></Link>
            <HiMiniXMark onClick={() => deletePost(post._id)} color='red' size={"1.5rem"} />
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <img src={post.imgUrl || ''} alt="" />
        </div>
      ))}
    </div>
  )
}

export default Posts;