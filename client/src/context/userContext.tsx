import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextType>({
    currentUser: null,
    setUserState: () => {}
})

export const UserContextProvider = (
    {
        children
    }:{
        children: React.ReactNode
    }
) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const setUserState = (user: User | null) => {
        setCurrentUser(user)
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}') 
        setCurrentUser(user)
    }, [])

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setUserState
            }}
        >
            { children }
        </UserContext.Provider>
    )
} 

const useContextUser = () => useContext(UserContext)
export default useContextUser