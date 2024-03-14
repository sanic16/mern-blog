import { Link } from "react-router-dom"

import './footer.css'

const Footer = () => {
  return (
    <footer>
        <ul className="footer__categories">
            <li>
                <Link to='/posts/categories/agriculture'>
                    Agricultura
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/business'>
                    Business
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/education'>
                    Educación
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/entertainment'>
                    Entretenimiento
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/art'>
                    Arte
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/art'>
                    Arte
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/investment'>
                    Inversión
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/weather'>
                    Clima
                </Link>
            </li>
            <li>
                <Link to='/posts/categories/uncategorized'>
                    Sin Categoría
                </Link>
            </li>
        </ul>
        <div className="footer__copyright">
            <small>
                Todos los derechos reservados &copy; Copyright, EGATOR { new Date().getFullYear() } 
            </small>
        </div>
    </footer>
  )
}

export default Footer