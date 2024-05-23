import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../utils/AdminContext";

const Navbar = () => {
    const navigate = useNavigate();
    const {isLogedIn, setIsLogedIn} = useContext(AdminContext);
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null || localStorage.getItem('admin_access_token') !== null) {
            setIsLogedIn(true);
        }
    }, [isLogedIn, setIsLogedIn]);
    const Logout = () => {
        localStorage.clear();
        navigate("/")
        setIsLogedIn(false)
    }
    return(
    <nav className="bg-gray-400 h-16">
      {isLogedIn?  <button className="float-right m-4 h-8 w-20 text-center bg-gray-700 hover:bg-gray-900 text-white rounded" onClick={Logout}> Logout</button> :
     <button className="float-right m-4 h-8 w-20 text-center bg-gray-700 hover:bg-gray-900 text-white rounded"> <Link to={'/'} >Login</Link></button> 
    }
    

    </nav>
    )
}

export default Navbar