import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './createPost.css'
import { formats, modules, post_categories } from '../utils/data'
import useContextUser from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { useCreatePostMutation } from '../store/postsApiSlice'

const CreatePost = () => {
  const navigation = useNavigate()
  const { currentUser } = useContextUser()
  useEffect(() => {
    if(!currentUser){
      navigation('/login')
    }
  }, [currentUser, navigation])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)

 
  const [
    createPost,
    { isLoading }
  ] = useCreatePostMutation()

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      setThumbnail(file[0])
    }
  }
  

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()   
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    thumbnail && formData.append('thumbnail', thumbnail)
    try {
      const response = await createPost(formData).unwrap()
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  } 

  if (!currentUser) {
    return null
  }

  return (
    <section className='create__post'>
      <div className="container create__post-container">
        <h2>
          Crear Post
        </h2>
        <p className="form__error-message">
          Error al crear el post
        </p>
        <form className="form crate__post-form" onSubmit={handleCreatePost}>
          <input type="text" placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select value={category} onChange={e => {
            setCategory(e.target.value)
            console.log(e.target.value)
          }}>
           {
            post_categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))
           }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} placeholder='Escribe algo...' className='ql__editor'/>
          <input type="file" onChange={handleThumbnail} accept='png, jpg, jpeg'/>
          {
            !isLoading ? (
              <button 
                type="submit" 
                className='btn primary'
              >
                Crear Post 
              </button>
            ):(
              <button 
                type="submit" 
                className='btn primary'
                disabled
              >
                Creando Post...
              </button>
            )
          }
        </form>
      </div>
    </section>
  )
}

export default CreatePost