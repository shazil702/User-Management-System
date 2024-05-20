import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminEdit = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/dashboard/${id}/`,{
                    headers:{
                        'Authorization' : `Bearer ${localStorage.getItem('admin_access_token')}`,
                        'Content-Type' : 'application/json',
                    },
                })
                console.log(response.data);
                if (response.data && response.data.username && response.data.phone){
                    setName(response.data.username);
                    setPhone(response.data.phone);
                }
            }
            catch(error){
                console.log("Error while fetching ", error);
            }
        };
        fetchData();
    },[])
    console.log(name,phone);
    const editData = async (e) => {
        e.preventDefault();
        const dataToEdit = {
            username : name,
            phone : phone,
        }
        try{
            await axios.put(`http://127.0.0.1:8000/api/dashboard/${id}/`,dataToEdit,{
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('admin_access_token')}`,
                    'Content-Type' : 'application/json',
                }
            })
            alert("Changes Applied");
            navigate('/admin');
        }
        catch(error){
            console.log('error while editing ', error);
        }
    }

return(
    <section className="bg-gray-900 dark:bg-gray-900">
     
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Edit user
                </h1>
                <form onSubmit={editData} className="space-y-4 md:space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123456789" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                  
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                   
                </form>
            </div>
        </div>
    </div>
    
  </section>
)
}
export default AdminEdit