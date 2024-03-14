import { Link } from "react-router-dom"
import avatarImage from '../assets/images/avatar14.jpg'

import { FaCheck, FaEdit } from "react-icons/fa"
import { useState } from "react"

import './userProfile.css'

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      const reader = new FileReader()
      reader.onload = () => {
        if(reader.readyState === 2){
          setAvatar(reader.result as string)
        }
      }
    }

  }
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/linux`} className="btn">
          Mis Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar || avatarImage} alt="User Avatar" />
            </div>
            <form className="avatar__form">
              <input type="file" name="avatar" id="avatar" accept="png, jpg, jpeg" onChange={handleAvatar}/>
              <label htmlFor="avatar"><FaEdit /></label>
            </form>
            <button className="profile__avatar-btn">
              <FaCheck />
            </button>
          </div>
          <h1>
            Julius Marroquín
          </h1>
          <form className="form profile__form">
            <p className="form__error-message">
              Error al actualizar el perfil
            </p>
            <input type="text" placeholder="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña Actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <input type="submit" className="btn primary" value={'Actualizar'} />
              
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile