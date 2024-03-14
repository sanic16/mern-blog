import { Link } from "react-router-dom"
import avatar from '../assets/images/avatar1.jpg'

import './postAuthor.css'

const PostAuthor = (
    {
        authorID
    }:{
        authorID: number
    }
) => {
  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
        <div className="post__author-avatar">
            <img src={avatar} alt="avatar" />
        </div>
        <div className="post__author-details">
            <h5>
                By: Julius Sanic
            </h5>
            <small>
                Just now
            </small>
        </div>
    </Link>
  )
}

export default PostAuthor