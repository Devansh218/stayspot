import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        setError(false)
        try {
            const res = await axios.get(url, {
                withCredentials: true
            });
            setData(res.data);
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchData()
    }, [url])

    const reFetch = async (url) => {
        setLoading(true)
        setError(false)
        try {
            const data = await axios.get(url);
            setData(data);
        } catch (err) {
            setError(err)
        }
    } 
    
    return { data, loading, error, reFetch }
}

export default useFetch;