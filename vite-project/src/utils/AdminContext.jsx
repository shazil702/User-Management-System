import { createContext, useState } from "react";

 export const  AdminContext = createContext({
    isLogedIn:false,
    setIsLogedIn: () => {}
})

export const AdminContextProvider = ({children}) => {
    const [isLogedIn, setIsLogedIn] = useState(false);
    

    return(
        <AdminContext.Provider value={{isLogedIn, setIsLogedIn}}>
            {children}
        </AdminContext.Provider>
    )
}