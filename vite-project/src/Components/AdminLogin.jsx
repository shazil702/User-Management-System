import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { AdminContext } from "../utils/AdminContext";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {setIsLogedIn} = useContext(AdminContext);

    const submit = async e => {
        e.preventDefault();
        const user = {
          email : email,
          password : password,
        };
        try{
          const {data} = await axios.post('http://127.0.0.1:8000/api/admintoken/',user,
            {headers:
              {'Content-Type': 'application/json'},
            }
          );
          localStorage.clear();
          localStorage.setItem('admin_access_token', data.access);
          localStorage.setItem('admin_refresh_token', data.refresh);
          setIsLogedIn(true);
          navigate('/admin');
        }
        catch(error){
          console.log("Error while sign in ", error);
          if (error.response && error.response.data && error.response.data.detail){
            setErrorMessage(error.response.data.detail);
        }
        else{
            setErrorMessage("Only Admins can sign in.");
        }
        }
      }
    return(
        <section className="bg-gray-900 dark:bg-gray-900">
     
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to Admin
                    </h1>
                    <form onSubmit={submit} className="space-y-4 md:space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                       
                    </form>
                </div>
            </div>
        </div>
        
      </section>
    )
}
export default AdminLogin