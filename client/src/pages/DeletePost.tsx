import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useContextUser from "../context/userContext"


const DeletePost = () => {
  const navigation = useNavigate()
  const { currentUser } = useContextUser()
  useEffect(() => {
    if(!currentUser){
      navigation('/login')
    }
  }, [currentUser, navigation])
  return (
    <div>DeletePost</div>
  )
}

export default DeletePost