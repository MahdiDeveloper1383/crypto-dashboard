import { ICoin } from "@/Interfaces/crypto/coin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseCoin({coin,currency}:{coin:ICoin,currency:string}) {
    return useQuery<{coin:ICoin}>({
        queryKey:['coin'],
        queryFn: async() =>{
            const response = await axios.get(`http://localhost:3000/api/crypto/coin/${coin}?currency=${currency}`)
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}