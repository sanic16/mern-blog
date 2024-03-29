import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './register.css'
import { useRegisterMutation } from "../store/usersApiSlice"

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const [
    register,
    { isLoading }
  ] = useRegisterMutation()


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
      const res = await register(userData).unwrap()
      if (res) {
        navigate('/login')
      }
    } catch (error: unknown) {
      if(error instanceof Object){
        if('data' in error){
          if('message' in (error as {data: {message: string}}).data){
            return setError((error as {data: {message: string}}).data.message)
          }
        }
      }
      
      setError('Error al registrar el usuario')
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
          {
            isLoading ? (
              <button
                className="btn primary"
                disabled
              >
                Registrando...
              </button>
            ) : (
              <button
                type="submit"
                className="btn primary"
              >
                Registrarse
              </button>
            
            ) 
            
          }
        </form>
        <small>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </small>
      </div>
    </section>
  )
}

export default Register