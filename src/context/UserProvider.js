import { useState } from "react";
import { UserContext } from './UserContext'

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();
    // const [url, setUrl] = useState('')
    
    return (
        // <UserContext.Provider value={{ hola: 'Mundo', user: user }}>
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}