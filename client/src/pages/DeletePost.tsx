import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useContextUser from "../context/userContext"
import { useDeletePostMutation } from "../store/postsApiSlice"

let firstRender = true

const DeletePost = () => {
  const navigation = useNavigate()
  const { currentUser } = useContextUser()
  const [deletePost] = useDeletePostMutation()
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id')
  const navigate = useNavigate()
  
  useEffect(() => {
    const handleDeletePost = async () => {
      if(!id) return
      try {
        const response = await deletePost(id).unwrap()
        console.log(response) 
      } catch (error) {
        console.log(error) 
      }
    }
    if(firstRender && import.meta.env.VITE_ENV === 'development'){
      firstRender = false
      return
    }
    handleDeletePost()
    navigate('/myposts')
    
  }, [deletePost, id])

  useEffect(() => {
    if(!currentUser){
      navigation('/login')
    }
    
  }, [currentUser, navigation])
  return (
    <>
    </>
  )
}

export default DeletePost