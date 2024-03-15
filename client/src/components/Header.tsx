import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { AiOutlineClose } from 'react-icons/ai'
import './header.css'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import useContextUser from '../context/userContext'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 800 ? true : false)
  const { currentUser } = useContextUser()
  const handleCloseMenu = () => {
    if(window.innerWidth < 800){
        setIsMenuOpen(false)
    }else{
        setIsMenuOpen(true)
    }
 }
    
  return (
    <nav>
        <div className="container nav__container">
            <Link to={'/'} className='nav__logo' onClick={handleCloseMenu}>
                <img src={logo} alt="Navbar Logo" />
            </Link>

            {
               currentUser ? (isMenuOpen && (
                    <ul className="nav__menu">
                        <li>
                            <Link to={'/profile/julius'} onClick={handleCloseMenu}>
                                Julius Marroquín
                            </Link>
                        </li>
                        <li>
                            <Link to={'/create'} onClick={handleCloseMenu}>
                                Crear Post
                            </Link>
                        </li>
                        <li>
                            <Link to={'/authors'} onClick={handleCloseMenu}>
                                Autores
                            </Link>
                        </li>
                        <li>
                            <Link to={'/logout'} onClick={handleCloseMenu}>
                                Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                )) : (isMenuOpen && (
                        <ul className="nav__menu">
                            <li>
                            <Link to={'/authors'} onClick={handleCloseMenu}>
                                Autores
                            </Link>
                        </li>
                        <li>
                            <Link to={'/login'} onClick={handleCloseMenu}>
                                Iniciar Sesión 
                            </Link>
                        </li>
                        </ul>
                ))
            }



            <button className="nav__toggle-btn" onClick={() => setIsMenuOpen(prev => !prev)}>
                {isMenuOpen ? <AiOutlineClose /> : <FaBars />} 
            </button>
        </div>
    </nav>
  )
}

export default Header