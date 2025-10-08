import { CoinMarket } from "@/app/interfaces/market";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseMarket() {
    return useQuery<CoinMarket[]>({
        queryKey: ['coins'],
        queryFn: async()=>{
            const response = await axios.get('http://localhost:3000/api/crypto/coins')
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}