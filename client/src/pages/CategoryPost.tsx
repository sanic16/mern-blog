import { useState } from "react"
import { posts_data } from "../utils/data"
import PostItem from "../components/PostItem"
import './categoryPost.css'
import { useParams } from "react-router-dom"

const CategoryPost = () => {
  const { category } = useParams<{category: string}>()
  
  const [posts] = useState(posts_data.filter(post => post.category === category))

  return (
    <section className="category__posts">

        {
        posts.length > 0 ?
        <div className="container category__posts-container">
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

export default CategoryPost





