import { INews } from "@/app/interfaces/crypto/news";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function UseNews(){
    return useQuery<INews[]>({
        queryKey:['news'],
        queryFn: async()=>{
            const response = await axios.get('http://localhost:3000/api/crypto/news')
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}