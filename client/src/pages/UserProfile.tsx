import { Link, useNavigate } from "react-router-dom"

import { FaCheck, FaEdit } from "react-icons/fa"
import { useEffect, useState } from "react"

import './userProfile.css'
import useContextUser from "../context/userContext"
import { 
  useGetProfileQuery, 
  useUpdateProfileMutation,
  useChangeAvatarMutation 
} from "../store/usersApiSlice"


const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigation = useNavigate()
  const { currentUser } = useContextUser()

  const [updatePrifle, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const {
    data: profile,
    error,
    isLoading,
    refetch
  } = useGetProfileQuery()

  const [changeAvatar] = useChangeAvatarMutation() 

  useEffect(() => {
    if(!currentUser){
      navigation('/login')
    }
  }, [currentUser, navigation])

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      setAvatar(URL.createObjectURL(file[0]))
      setAvatarFile(file[0])
    }
    
  }

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile as Blob)
      const response = await changeAvatar(formData).unwrap()
      console.log(response)
    } catch (error) {
      console.log(error) 
    }
  }

  useEffect(() => {
    if(profile){
      setName(profile.name)
      setEmail(profile.email)
      setAvatar(profile.avatar)
    }
  }, [profile])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    if(!name || !email || !currentPassword || !newPassword || !confirmNewPassword){
      setErrorMessage('Todos los campos son requeridos')
      return
    } 
    if(currentPassword === newPassword){
      setErrorMessage('La nueva contraseña no puede ser igual a la actual')
      return
    }
    if(currentPassword.length < 6 || newPassword.length < 6 || confirmNewPassword.length < 6 || newPassword !== confirmNewPassword){
      setErrorMessage('La contraseña debe tener al menos 6 caracteres y deben coincidir')
      return
    }
    try {
      const response = await updatePrifle({
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      }).unwrap()
      console.log(response)
      refetch()
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')  
    } catch (error) {
      setErrorMessage('Error al actualizar el perfil') 
    }
  }

  if(isLoading) return <h1>Loading...</h1>
  if(error) return <h1>Error</h1>
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts`} className="btn">
          Mis Posts
        </Link>
        <div className="profile__details">

          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <label htmlFor="avatar">
                <img src={avatar} alt="User Avatar" />
              </label>
            </div>
            <form className="avatar__form" autoComplete="off">
              <input type="file" name="avatar" id="avatar" accept="png, jpg, jpeg" onChange={handleAvatar}/>
              {
                !avatarFile && <label htmlFor="avatar"><FaEdit /></label>
              }
            </form>
            {
              avatarFile && (
                <button 
                  className="profile__avatar-btn"
                  onClick={handleUpdateAvatar}
                >
                  <FaCheck />
                </button>
              )
            }
          </div>

          <h1>
            { currentUser?.name }
          </h1>
          <form className="form profile__form" onSubmit={handleSubmit}>
            {
              errorMessage && (
                <p className="form__error-message">
                  { errorMessage }
                </p>
              )
            }
            <input type="text" placeholder="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email"  placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" autoComplete='new-password' placeholder="Contraseña Actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirmar Contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            {
              isUpdating ? (
                <input type="submit" disabled className="btn primary" value='Actualizando ...' />
              ): 
              (
                <input type="submit" className="btn primary" value='Actualizar' />
              )
            }
              
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile