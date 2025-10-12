import { CryptoAPIResponse } from "@/app/_Interfaces/crypto/trend";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseTrend(){
    return useQuery<CryptoAPIResponse>({
        queryKey:['trend'],
        queryFn: async ()=> {
            const response = await axios.get('http://localhost:3000/api/crypto/trend')
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}