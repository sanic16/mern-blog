import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import './postItem.css'

const PostItem = (
    {
        _id,
        thumbnail,
        category,
        title,
        description,
        creator,
        createdAt
    }: Post
) => {
  const shortDescription = description.length > 145 ? description.substring(0, 145) + '...' : description  
  const postTitle = title.length > 50 ? title.substring(0, 30) + '...' : title
  return (
    <article className="post">
        <div>
            <div className="post__thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${_id}`}>
                    <h3>
                        { postTitle }
                    </h3>
                </Link>
                <p 
                    dangerouslySetInnerHTML={{__html: shortDescription  }}
                >
                </p>
            </div>   
        </div>
        <div className="post__footer">
            <PostAuthor authorID={creator} createdAt={createdAt} />
            <Link to={`/posts/categories/${category}`} className="btn category">
                { category }
            </Link>
        </div>
        
    </article>
  )
}

export default PostItem