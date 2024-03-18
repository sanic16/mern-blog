import { Link, useParams } from "react-router-dom"
import PostAuthor from "../components/PostAuthor"
import './postDetail.css'
import { useGetPostQuery } from "../store/postsApiSlice"

const PostDetail = () => {

  const { id } = useParams<{id: string}>()
  if(!id) return null
  const { data } = useGetPostQuery(id)
  if(!data) return null

  

  return (
    <section className="post__detail">
      <div className="container post__detail-container">
        <div className="post__detail-header">
          <PostAuthor authorID={data.post.creator} createdAt={data.post.createdAt}/>
          <div className="post__detail-buttons">
            <Link 
              to={`/posts/${id}/edit?id=${id}`} 
              className="btn sm primary"
            >
              Editar
            </Link> 
            <Link 
              to={`/posts/${id}/delete?id=${id}`} 
              className="btn sm danger"
            >
              Eliminar
            </Link> 
          </div>
        </div>
        <h1>
          { data.post.title }
        </h1>
        <div className="post__detail-thumbnail">
          <img src={data.post.thumbnail} alt="" />
        </div>
        <p 
          className="post__detail-content" 
          dangerouslySetInnerHTML={{__html: data.post.description}}
        >
          
        </p>

      </div>
    </section>
  )
}

export default PostDetail