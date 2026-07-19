import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Watchlist from "./Watchlist";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Settings from "./Settings";


export default function DashboardContent({
activeTab
}:{
activeTab:string
}){


switch(activeTab){


case "Overview":
return <Overview/>;


case "Portfolio":
return <Portfolio/>;


case "Watchlist":
return <Watchlist/>;


case "Wallet":
return <Wallet/>;


case "Transactions":
return <Transactions/>;


case "Settings":
return <Settings/>;


default:
return <Overview/>;

}


}