import { ChartData } from "@/app/interfaces/crypto/chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseChart(coins:string[]){
    return useQuery<{coins:ChartData[]}>({
        queryKey:['charts',coins],
        queryFn: async()=>{
            const response = await axios.post('http://localhost:3000/api/crypto/charts',{coins})
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}