import { Link } from "react-router-dom"
import './errorPage.css'

const ErrorPage = () => {
  return (
    <section className="error__page">
      <div className="center">
        
        <h2>
          404 | Página no encontrada
        </h2>

        <Link to='/' className="btn">
          Regresar a Inicio
        </Link>
      </div>
    </section>
  )
}

export default ErrorPage