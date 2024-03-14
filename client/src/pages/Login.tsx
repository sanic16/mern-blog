import { useState } from "react"
import { Link } from "react-router-dom"
import './login.css'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(`${e.target.name}: ${e.target.value}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(userData)
  }

  return (
    <section className="login">
      <div className="container login__container">
        <h2>
          Iniciar sesión
        </h2>
        <form 
          onSubmit={handleSubmit} 
          className="form login__form"
        >
          <p className="form__error-message">
            Crendenciales incorrectas
          </p>
          
          <input 
            type="email" 
            placeholder="Correo"
            value={userData.email}
            name="email"
            onChange={handleInputChange}
            autoFocus
          />
          <input 
            type="password" 
            placeholder="Contraseña"
            value={userData.password}
            name="password"
            onChange={handleInputChange}
          />
          
          <button 
            type="submit" 
            className="btn primary"
          >
            Iniciar sesión
          </button>
        </form>
        <small>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </small>
      </div>
    </section>
  )
}


export default Login