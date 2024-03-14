type PostType = {
    id: number,
    thumbnail1: string,
    category: string,
    title: string,
    desc: string,
    autorID: number
}

type AuthorType = {
    id: number,
    avatar: string,
    name: string,
    description?: string,
    posts: number,

}