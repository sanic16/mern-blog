import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './register.css'
import axios from "axios"

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(`${e.target.name}: ${e.target.value}`)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/register`, userData)
      const newUser = response.data
      console.log(newUser)
      if(!newUser){
        return setError('Error al registrar el usuario')
      }
      navigate('/login')
    } catch (error: any) {
      setError(error?.response?.data.message || error.message)
      
    }
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
          {
            error && (
              <p className="form__error-message">
               {error}
              </p>
            )
          }
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
            value={userData.password2}
            name="password2"
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