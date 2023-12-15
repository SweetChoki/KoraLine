import { useState } from "react";
import { UserContext } from './UserContext'

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();
    const url = 'https://656ba5b5dac3630cf7284ad0.mockapi.io/';
    
    return (
        // <UserContext.Provider value={{ hola: 'Mundo', user: user }}>
        <UserContext.Provider value={{ user, setUser, url }}>
            { children }
        </UserContext.Provider>
    )
}