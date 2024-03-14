import { useEffect } from "react"
import useContextUser from "../context/userContext"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const { setUserState } = useContextUser()

  const navigate = useNavigate()
  useEffect(() => {
    setUserState(null)
    navigate('/login')
  }, [])
  return (
    <>
    </>
  )
}

export default Logout