import { useEffect, useState } from "react"

const Home = () => {
    const [showData , setShowData] = useState(false)
    useEffect(()=>{
        if (localStorage.getItem('access_token') !== null) {
            setShowData(true);
        }
    },[])
    if(showData){
   
return(
    

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
    </div>
   
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt=""/>
    </div>
</div>

)
    }
    return(
        <section className="bg-gray-900 dark:bg-gray-900 h-">
             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User should Sign in </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">Please click the login button </p>
        </a>
        </div>
        </section>
        
            )
}

   

export default Home