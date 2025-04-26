import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const userContext = createContext()

function UserProvider({children}){
    const [userData,setUserData]  = useState(() => {
        const storedUser = localStorage.getItem('userDetails')
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        if(userData) {
            localStorage.setItem('userDetails',JSON.stringify(userData))
        }
        else {
            localStorage.removeItem('userDetails')
        }
    },[userData])

    return (
        <userContext.Provider 
        value={{
            userData,
            setUserData
        }}
        >
            {children}
        </userContext.Provider>
    )
}
function useUser(){
    const context = useContext(userContext)
    if(context === undefined) throw new Error('You might have used the user context outside the userProvider ')
    return context
}
export {useUser,UserProvider}