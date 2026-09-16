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
        symbol:string;
        amount:number;
    }[];

    watchlist:string[];


}