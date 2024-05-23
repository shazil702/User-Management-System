import { useEffect, useState } from "react"

export const useHooks = () => {
    const [loading , setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        console.log("useEffect");
        return(
            console.log("data cleared")
        )
    },[]);
}
