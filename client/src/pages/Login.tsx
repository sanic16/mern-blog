import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useContextUser from "../context/userContext"
import './login.css'
import { useLoginMutation } from "../store/usersApiSlice"

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { setUserState } = useContextUser()

  const [login, {error, isLoading}] = useLoginMutation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    // console.log(`${e.target.name}: ${e.target.value}`)
  }

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await login(userData).unwrap()
      if(res){
        setUserState(res)
        navigate('/')
      }
    } catch (error) {
      console.log('error\t', error)
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
                { 'data' in error ? ('message' in (error.data as {message: string}) ? (error.data as {message: string}).message : 'Error') : 'Error'}
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
          
          {
            isLoading ? (
              <button
                className="btn primary"
                disabled
              >
                Iniciando sesión...
              </button>
            ) : (
              <button
                type="submit"
                className="btn primary"
              >
                Iniciar sesión
              </button>
            
            ) 
            
          }
        </form>
        <small>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </small>
      </div>
    </section>
  )
}


export default Login