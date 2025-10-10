import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const URL = 'https://api.coingecko.com/api/v3/search/trending'
        const res = await axios.get(URL,{
            headers:{
                 "x-cg-demo-api-key": "CG-3zw8oqXXv22GGR749vbqDrh4",
            }
        })
        if(!res) throw new Error('Faild to fetch from CoinGecko')
        return NextResponse.json(res.data)
    }catch(err){
        return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
    }
}