import React from "react";
import Header from "./_Components/Header";
import GlobalMarketTable from "./_Components/overviewtable";
import TopCoins from "./_Components/TopCoins";

export default function Home() {
  return (
    <React.Fragment>
      <Header/>
      <GlobalMarketTable/>
      <TopCoins/>
    </React.Fragment>
  );
}
