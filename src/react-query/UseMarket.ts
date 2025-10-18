import { CoinMarket } from "@/Interfaces/crypto/market";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseMarket(currency:string) {
    return useQuery<CoinMarket[]>({
        queryKey: ['coins',currency],
        queryFn: async()=>{
            const response = await axios.get(`http://localhost:3000/api/crypto/markets?currency=${currency}`)
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}