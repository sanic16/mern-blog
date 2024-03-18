import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem('user') || '{}')
            if(user && user.token){
                headers.set('authorization', `Bearer ${user.token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Authors', 'Profile', 'Posts', 'Post', 'CategoryPosts', 'AuthorPosts'],
    endpoints: () => ({

    })
})