import PostItem from "./PostItem"
import './posts.css'
import { useGetPostsQuery } from "../store/postsApiSlice"

const Posts = () => {
  const { data } = useGetPostsQuery()
  if(!data) return <h2>Loading...</h2>
  console.log(data)
  return (
    <section className="posts">

        {
        data.posts.length > 0 ?
        <div className="container posts__container">
            {
                data.posts.map(post => (
                    <PostItem {...post} key={post._id} />
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