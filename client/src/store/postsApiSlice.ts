import { api } from "./apiSlice";

const postsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<Posts, void>({
            query: () => ({
                url: '/posts',
                method: 'GET'
            }),  
            transformResponse: (response: Posts) => {
                return{
                    posts: response.posts.map(post => {
                        return {
                            _id: post._id,
                            title: post.title,
                            category: post.category,
                            description: post.description,
                            thumbnail: `${import.meta.env.VITE_SERVER_STATIC}/${post.thumbnail}`,
                            creator: post.creator,
                            createdAt: post.createdAt,
                        }

                    })
                }
            },
            providesTags: ['Posts'],        
        }),
        getPostsByCategory: builder.query<Posts, string>({
            query: (category) => ({
                url: `/posts/categories/${category}`,
                method: 'GET'
            }),
            transformResponse: (response: Posts) => {
                return{
                    posts: response.posts.map(post => {
                        return {
                            _id: post._id,
                            title: post.title,
                            category: post.category,
                            description: post.description,
                            thumbnail: `${import.meta.env.VITE_SERVER_STATIC}/${post.thumbnail}`,
                            creator: post.creator,
                            createdAt: post.createdAt,
                        }

                    })
                }
            },
            providesTags: ['CategoryPosts']     
        }),
        getPostsByAuthor: builder.query<Posts, string>({
            query: (author) => ({
                url: `/posts/users/${author}`,
                method: 'GET'
            }),
            providesTags: ['AuthorPosts'],
            transformResponse: (response: Posts) => {
                return{
                    posts: response.posts.map(post => {
                        return {
                            _id: post._id,
                            title: post.title,
                            category: post.category,
                            description: post.description,
                            thumbnail: `${import.meta.env.VITE_SERVER_STATIC}/${post.thumbnail}`,
                            creator: post.creator,
                            createdAt: post.createdAt,
                        }
                    })
                }
            },
            
        }),
        createPost: builder.mutation<string, FormData>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Posts', 'Authors', 'Profile']

        }),
        getPost: builder.query<PostSingle, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            }),
            transformResponse: (response: PostSingle) => {
                return{
                    post: {
                        _id: response.post._id,
                        title: response.post.title,
                        category: response.post.category,
                        description: response.post.description,
                        thumbnail: `${import.meta.env.VITE_SERVER_STATIC}/${response.post.thumbnail}`,
                        creator: response.post.creator,
                        createdAt: response.post.createdAt,
                    }
                }
            
            },
            providesTags: (result, error, id) => {
                if(error || !result){
                    return [{type: 'Post', id}]
                }
                return [{type: 'Post', id}]
            }

        }),
        editPost: builder.mutation<string, {id: string, body: FormData}>({
            query: ({id, body}) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Posts', 'Authors', 'Profile', 'Post', 'CategoryPosts', 'AuthorPosts']

        }),
        deletePost: builder.mutation<{message: string}, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Posts', 'Authors', 'Profile', 'Post', 'CategoryPosts', 'AuthorPosts']
        }),

        
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByCategoryQuery,
    useGetPostsByAuthorQuery,
    useCreatePostMutation,
    useGetPostQuery,
    useEditPostMutation,
    useDeletePostMutation
} = postsApiSlice