import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import useContextUser from "../context/userContext"
import './login.css'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { setUserState } = useContextUser()

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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/login`, userData)
      const user = response.data
      if(!user){
        return setError('Error al iniciar sesión')
      }
      setUserState(user)
      navigate('/')
    } catch (error: any) {
      setError(error.response.data.message || error.message)
    }
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
          {
            error && (
            <p className="form__error-message">
              { error }
            </p>
            )
          }
          
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