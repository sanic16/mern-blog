import { useState } from "react"
import { posts_data } from "../utils/data"
import PostItem from "../components/PostItem"
import './authorPosts.css'

const AuthorPosts = () => {
  const [posts] = useState(posts_data)
  return (
    <section className="author__posts">

        {
        posts.length > 0 ?
        <div className="container author__posts-container">
            {
                posts.map((post) => (
                    <PostItem {...post} key={post.id} />
                ))
            }
        </div>
        : 
        <h2 className="center">
            Aún no hay publicaciones
        </h2>}
    </section>
  )
}

export default AuthorPosts