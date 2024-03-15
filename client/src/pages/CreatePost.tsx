import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './createPost.css'
import { formats, modules, post_categories } from '../utils/data'
import useContextUser from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>('')

  const { currentUser } = useContextUser()
  const navigation = useNavigate()

  useEffect(() => {
    console.log(currentUser)
    if(!currentUser){
      navigation('/login')
    }
  }, [currentUser, navigation])

  const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setThumbnail(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
    console.log(thumbnail)
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
        <form className="form crate__post-form">
          <input type="text" placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select value={category} onChange={e => setCategory(e.target.value)}>
           {
            post_categories.map(category => (
              <option key={category}>
                {category}
              </option>
            ))
           }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} placeholder='Escribe algo...' className='ql__editor'/>
          <input type="file" onChange={handleUploadThumbnail} accept='png, jpg, jpeg'/>
          {/* <img src={thumbnail ? thumbnail.toString() : ''} alt="Thumbnail" className='thumbnail'/> */}
          <button type="submit" className='btn primary'>
            Crear Post 
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost