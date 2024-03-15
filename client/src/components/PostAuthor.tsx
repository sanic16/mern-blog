import { Link } from "react-router-dom"
import avatar from '../assets/images/avatar1.jpg'

import './postAuthor.css'
import { useEffect } from "react"

const PostAuthor = (
    {
        authorID,
        createdAt
    }:{
        authorID: string,
        createdAt: string
    }
) => {
  useEffect(() => {
    const getAuthor = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${authorID}`);
        const data = await res.json();
        return data;
    }  
    getAuthor().then(data => {
        console.log(authorID)
        console.log(data);
    })
  }, [])
  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
        <div className="post__author-avatar">
            <img src={avatar} alt="avatar" />
        </div>
        <div className="post__author-details">
            <h5>
                By: Julius Sanic
            </h5>
            <small>
                { new Date(createdAt).toLocaleDateString() }
            </small>
        </div>
    </Link>
  )
}

export default PostAuthor