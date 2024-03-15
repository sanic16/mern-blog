import { api } from "./apiSlice";

const usersApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<string, RegisterUser>({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body: body
            })
        }),
        login: builder.mutation<User, {email: string, password: string}>({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body: body
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation
} = usersApiSlice