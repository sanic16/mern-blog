import { useEffect, useState } from "react"
import { posts_data } from "../utils/data"
import { Link, useNavigate } from "react-router-dom"
import useContextUser from "../context/userContext"
import { useGetPostsByAuthorQuery, useDeletePostMutation } from "../store/postsApiSlice"
import './dashboard.css'

const Dashboard = () => {
  const [posts] = useState<PostType[]>(posts_data)

  const { currentUser } = useContextUser()
  const navigation = useNavigate()

  const { data } = useGetPostsByAuthorQuery(currentUser?.id || '0')
  const [deletePost] = useDeletePostMutation()


  useEffect(() => {
    if(!currentUser){
      navigation('/login')
    }
  }, [currentUser, navigation])

  return (
    <section className="dashboard">
      {
        posts.length ? (
          <div className="container dashboard__container">
            {
              data?.posts.map(post => (
                <article key={post._id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={post.thumbnail} alt="" />
                    </div>
                    <h5>
                      {post.title}
                    </h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className="btn sm">
                      Ver Post
                    </Link>
                    <Link to={`/posts/${post._id}/edit?id=${post._id}`} className="btn sm primary">
                      Editar
                    </Link>
                    <button 
                      className="btn sm danger"
                      onClick={() => {
                        deletePost(post._id)
                        console.log('delete')
                      }
                      }
                    >
                      Eliminar
                    </button>

                  </div>
                </article>
              ))
            }
          </div>
        ):(
          <h2 className="center">
            Aún no hay posts
          </h2>
        )
      }
    </section>
  )
}

export default Dashboard