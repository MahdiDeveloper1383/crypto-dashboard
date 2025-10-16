import { GlobalApiResponse } from "@/Interfaces/crypto/global";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseGlobal(){
    return useQuery<GlobalApiResponse>({
        queryKey:['global'],
        queryFn: async()=>{
            const response = await axios.get('/api/crypto/global')
            return JSON.parse(JSON.stringify(response.data));
        }
    })
}