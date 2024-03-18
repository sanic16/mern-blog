import { api } from "./apiSlice";

const usersApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<string, RegisterUser>({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Authors']
        }),
        login: builder.mutation<User, {email: string, password: string}>({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Authors', 'Profile']
        }),
        getAuthor: builder.query<Author, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET'
            }),
            transformResponse: (response: Author) => {
                return{
                    _id: response._id,
                    name: response.name,
                    avatar: `${import.meta.env.VITE_SERVER_STATIC}/${response.avatar}`,
                    email: response.email,
                    posts: response.posts
                }
            }
        }),
        getAuthors: builder.query<Author[], void>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            transformResponse: (response: Author[]) => response.map(author => {
                return {
                    _id: author._id,
                    name: author.name,
                    avatar: `${import.meta.env.VITE_SERVER_STATIC}/${author.avatar}`,
                    email: author.email,
                    posts: author.posts
                }
            }),
            providesTags: ['Authors']
        }),
        getProfile: builder.query<Author, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET'
            }),
            transformResponse: (response: Author) => {
                return {
                    _id: response._id,
                    name: response.name,
                    avatar: `${import.meta.env.VITE_SERVER_STATIC}/${response.avatar}`,
                    email: response.email,
                    posts: response.posts
                
                }
            },
            providesTags: ['Profile']
        }),
        updateProfile: builder.mutation<Author, UpdateProfile>({
            query: (body) => ({
                url: '/users/edit-user',
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Authors', 'Profile'],
        }),
        changeAvatar: builder.mutation<string, FormData>({
            query: (body) => ({
                url: '/users/change-avatar',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Authors', 'Profile']
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetAuthorsQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangeAvatarMutation,
    useGetAuthorQuery
} = usersApiSlice