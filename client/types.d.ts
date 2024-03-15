type PostType = {
    id: string,
    thumbnail1: string,
    category: string,
    title: string,
    desc: string,
    authorId: string
    createdAt: string
}

type AuthorType = {
    id: number,
    avatar: string,
    name: string,
    description?: string,
    posts: number,

}

type User = {
    token: string,
    name: string,
    id: string
}

type UserContextType = {
    currentUser: User | null,
    setUserState: (user: User | null) => void 
}

type FetchedPosts = {
    "posts": {
          "_id": string
          "title": string
          "category": string
          "description": string
          "creator": string 
          "thumbnail": string
          "createdAt": string
          "updatedAt": string
        } []      
}

type RegisterUser = {
    name: string,
    email: string,
    password: string,
    password2: string
}