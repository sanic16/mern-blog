import { useState } from "react"
import { posts_data } from "../utils/data"
import PostItem from "./PostItem"
import './posts.css'

const Posts = () => {
  const [posts] = useState(posts_data)   

  return (
    <section className="posts">

        {
        posts.length > 0 ?
        <div className="container posts__container">
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

export default Posts