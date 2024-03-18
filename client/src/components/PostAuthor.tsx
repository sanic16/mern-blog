import { Link } from "react-router-dom"
import { useGetAuthorQuery } from "../store/usersApiSlice"

import './postAuthor.css'

const PostAuthor = (
    {
        authorID,
        createdAt
    }:{
        authorID: string,
        createdAt: string
    }
) => {

  const {
        data: author
  } = useGetAuthorQuery(authorID)  
  
  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
        <div className="post__author-avatar">
            <img src={author?.avatar} alt="avatar" />
        </div>
        <div className="post__author-details">
            <h5>
                { author?.name }
            </h5>
            <small>
                { new Date(createdAt).toLocaleDateString() }
            </small>
        </div>
    </Link>
  )
}

export default PostAuthor