import { useEffect, useState } from "react"
import { posts_data } from "../utils/data"
import { Link, useNavigate } from "react-router-dom"
import useContextUser from "../context/userContext"
import './dashboard.css'

const Dashboard = () => {
  const [posts] = useState<PostType[]>(posts_data)

  const { currentUser } = useContextUser()
  const navigation = useNavigate()

  useEffect(() => {
    console.log(currentUser)
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
              posts.map(post => (
                <article key={post.id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={post.thumbnail1} alt="" />
                    </div>
                    <h5>
                      {post.title}
                    </h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post.id}`} className="btn sm">
                      Ver Post
                    </Link>
                    <Link to={`/posts/${post.id}/edit`} className="btn sm primary">
                      Editar
                    </Link>
                    <Link to={`/posts/${post.id}/delete`} className="btn sm danger">
                      Eliminar
                    </Link>

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