export interface IUser{
    id:string;

    firstname:string;

    lastname:string;

    username:string;

    email:string;

    password:string;

    role:"user"|"admin";

    createdAt:string;

    walletAddress:string;

    usdBalance:number;

    balances:{
        coinId:string;
        symbol:string;
        amount:number;
        investedUsd:number;
    }[];

    watchlist:string[];


}