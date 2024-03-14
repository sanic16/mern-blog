import { useState } from "react"
import { Link } from "react-router-dom"
import './register.css'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    <section className="register">
      <div className="container register__container">
        <h2>
          Registrarse
        </h2>
        <form 
          onSubmit={handleSubmit} 
          className="form register__form"
        >
          <p className="form__error-message">
            El correo ya está registrado
          </p>
          <input 
            type="text" 
            placeholder="Nombre Completo"
            value={userData.name}
            name="name"
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            placeholder="Correo"
            value={userData.email}
            name="email"
            onChange={handleInputChange}
          />
          <input 
            type="password" 
            placeholder="Contraseña"
            value={userData.password}
            name="password"
            onChange={handleInputChange}
          />
          <input 
            type="password" 
            placeholder="Confirmar Contraseña"
            value={userData.confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            className="btn primary"
          >
            Registrarse
          </button>
        </form>
        <small>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </small>
      </div>
    </section>
  )
}

export default Register