export interface IUsers{
    id:string;
    firsname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    usdBalance:number;
    btcBalance:number;
    ethBalance:number;
    walletAddress:string;
    role:'user'|'admin'
    createdAt:string
}