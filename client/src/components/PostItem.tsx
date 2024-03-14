import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import './postItem.css'

const PostItem = (
    {
        id,
        thumbnail1,
        category,
        title,
        desc,
        autorID
    }: PostType
) => {
  const shortDescription = desc.length > 145 ? desc.substring(0, 145) + '...' : desc  
  const postTile = title.length > 50 ? title.substring(0, 30) + '...' : title
  return (
    <article className="post">
        <div>
            <div className="post__thumbnail">
                <img src={thumbnail1} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${id}`}>
                    <h3>
                        { postTile }
                    </h3>
                </Link>
                <p>
                    { shortDescription }
                </p>
            </div>   
        </div>
        <div className="post__footer">
            <PostAuthor authorID={autorID} />
            <Link to={`/posts/categories/${category}`} className="btn category">
                { category }
            </Link>
        </div>
        
    </article>
  )
}

export default PostItem