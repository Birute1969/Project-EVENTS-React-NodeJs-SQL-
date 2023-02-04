import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleSetUser = (data) => setUser(data);// f-ja, kai galime keisti user

    return (
        //bet kuri aplikacijos vieta gales pasiekti user data:
        <UserContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
}