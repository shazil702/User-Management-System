import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({setAuth}) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null || localStorage.getItem('admin_access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);
    const Logout = () => {
        localStorage.clear();
        navigate("/")
        setIsAuth(false)
    }
    return(
    <nav className="bg-gray-400 h-16">
      {isAuth?  <button className="float-right m-4 h-8 w-20 text-center bg-gray-700 hover:bg-gray-900 text-white rounded" onClick={Logout}> Logout</button> :
     <button className="float-right m-4 h-8 w-20 text-center bg-gray-700 hover:bg-gray-900 text-white rounded"> <Link to={'/'} >Login</Link></button> 
    }
    </nav>
    )
}

export default Navbar