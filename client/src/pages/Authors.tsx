
import { Link } from "react-router-dom"
import './authors.css'
import { useGetAuthorsQuery } from "../store/usersApiSlice"

const Authors = () => {

  const {data, isError, } = useGetAuthorsQuery()

  if(isError || !data) return <h1>Something went wrong</h1>
  

  return (
    <section className="authors">
      
          <div className="container authors__container">
            {
              data.map(({_id, name, avatar, posts}) => (
                <Link key={_id} to={`/posts/users/${_id}`} className="author">
                  <div>
                    <div className="author__avatar">
                      <img src={avatar} alt={`Image of ${name}`} />
                    </div>
                  </div>
                  <div className="author__info">
                    <h4>{ name }</h4>
                    
                    <small>{ posts }</small>
                  </div>
                </Link>
              ))
            }
              
           
          </div>
       
     
    </section>
  )
}

export default Authors