import { useEffect, useState } from "react"
import PostItem from "./PostItem"
import './posts.css'
import Spinner from "./Spinner"

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);
        const data = await res.json();
        return data;
    };

    try {
        const data: Promise<FetchedPosts> = fetchPosts();
        data.then((data) => {
            const transformedData = data.posts.map(post => {
                return {
                    id: post._id,
                    thumbnail1: `${import.meta.env.VITE_SERVER_STATIC}/${post.thumbnail}`,
                    category: post.category,
                    title: post.title,
                    desc: post.description,
                    authorId: post.creator,
                    createdAt: post.createdAt

                };
            });
            setPosts(transformedData);
            setIsLoading(false);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
    }
}, []);


   if(isLoading) return <Spinner />

  return (
    <section className="posts">

        {
        posts.length > 0 ?
        <div className="container posts__container">
            {
                posts.map((post) => (
                    <PostItem {...post} key={post.id} />
                ))
            }
        </div>
        : 
        <h2 className="center">
            Aún no hay publicaciones
        </h2>}
    </section>
  )
}

export default Posts