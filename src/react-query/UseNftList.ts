import { NftList } from "@/Interfaces/crypto/NftList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseNftList(){
    return useQuery<NftList[]>({
        queryKey:['ntfs'],
        queryFn:async()=>{
            const response = await axios.get('http://localhost:3000/api/crypto/nfts')
            return JSON.parse(JSON.stringify(response.data))
        }
    })
}