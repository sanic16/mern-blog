import PostItem from "../components/PostItem"
import './categoryPost.css'
import { useParams } from "react-router-dom"
import { useGetPostsByCategoryQuery } from "../store/postsApiSlice"

const CategoryPost = () => {
  const { category } = useParams<{category: string}>()
  if(!category) return null
  const { data, error} = useGetPostsByCategoryQuery(category.charAt(0).toUpperCase() + category.slice(1))
  if (!data || error){ 
    return(
    <section className="category__posts">
        <h2 className="center">
            No hay posts en esta categoría
        </h2>
    </section>
  )
  }  
 

  return (
    <section className="category__posts">

        {
            data.posts.length > 0 ? (
                <div className="container category__posts-container">
                    {
                        data.posts.map((post) => (
                            <PostItem {...post} key={post._id} />
                        ))
                    }
                </div>
            ) : (
                <h2 className="center">
                    No hay posts en esta categoría
                </h2>
            )
        }
    </section>
  )
}

export default CategoryPost





