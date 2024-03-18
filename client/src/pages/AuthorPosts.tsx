import PostItem from "../components/PostItem"
import { useParams } from "react-router-dom"
import { useGetPostsByAuthorQuery } from "../store/postsApiSlice"
import './authorPosts.css'

const AuthorPosts = () => {
    const { id } = useParams<{id: string}>()
    if(!id) return null
    const { data, error} = useGetPostsByAuthorQuery(id)
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

export default AuthorPosts