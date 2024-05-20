"use client";

import {Button, Table} from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Admin = () => {
    const [users, setUsers] = useState([]);
    const [word, setWord] = useState('');

    const [showData , setShowData] = useState(false)
    useEffect(()=>{
        if (localStorage.getItem('admin_access_token') !== null) {
            setShowData(true);
        }
    },[])
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard/',{
                    headers:{
                        'Authorization' :  `Bearer ${localStorage.getItem('admin_access_token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                setUsers(response.data);
                console.log(response.data);
            }catch(error){
                console.log("Error while fetching data ", error);
            }
        }
        fetchData();
    },[])
    const deleteData = async (id) => {
      try{
        await axios.delete(`http://127.0.0.1:8000/api/dashboard/${id}/`,{
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('admin_access_token')}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(users.filter((data) => data.id !== id));
      }catch(error){
        console.log("Error while deleting ", error);
      }
    }
    useEffect(()=>{
      const searchData = async () => {
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/search/',{
            word:word
          },{
            headers:{
              'Authorization' : `Bearer ${localStorage.getItem('admin_access_token')}`,
              'Content-Type': 'application/json',
            }
          })
          setUsers(response.data)
          console.log(response.data);
        }catch(error){
          console.log("error while searching ",error);
        }
      }
      searchData();
    },[word])
if (showData){
    return(
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center m-4">
<form className="max-w-md mx-auto">   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" value={word} onChange={(e) => setWord(e.target.value)} className="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" required />
        
    </div>
</form>

        <Link to={'/adminRegister'}>
          <Button className="bg-gray-900 text-gray-200 rounded float-end">Add User</Button>
        </Link>
        </div>
         <Table hoverable>
      
      <Table.Head className="p-4">
        <Table.HeadCell>
        Delete
        </Table.HeadCell>
        
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
      
        <Table.HeadCell>
      
        </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4 cursor-pointer" onClick={() => deleteData(user.id)}>
              ❌
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.username}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.email}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.phone}</Table.Cell>
            <Table.Cell>
            <Link to={`/adminEdit?id=${user.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
                </Link>
            </Table.Cell>
          </Table.Row>
          ))}
     
        </Table.Body>
      </Table>
        </div>
    )
  }
  return(
    <section className="bg-gray-900 dark:bg-gray-900 h-">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Admin should Sign in </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Please login</p>
    </a>
    </div>
    </section>
    
        )
}

export default Admin