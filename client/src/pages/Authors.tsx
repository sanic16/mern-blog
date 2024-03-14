import { useState } from "react"
import { author_data } from "../utils/data"
import { Link } from "react-router-dom"
import './authors.css'

const Authors = () => {

  const [authors] = useState<AuthorType[]>(author_data)

  return (
    <section className="authors">
      {
        authors.length > 0? (
          <div className="container authors__container">
            {
              authors.map(({id, name, avatar, posts, description}) => (
                <Link key={id} to={`/posts/users/${id}`} className="author">
                  <div className="author__avatar">
                    <img src={avatar} alt={`Image of ${name}`} />
                  </div>
                  <div className="author__info">
                    <h4>{ name }</h4>
                    <p>{ description }</p>
                    <small>{ posts }</small>
                  </div>
                </Link>
              ))
            }
          </div>
        ) : (
          <h2 className="center">
            Aún no hay autores
          </h2>
        )
      }
    </section>
  )
}

export default Authors