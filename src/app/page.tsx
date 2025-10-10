import React from "react";
import Header from "./_Components/Header";
import GlobalMarketTable from "./_Components/overviewtable";
import TopCoins from "./_Components/TopCoins";
import Chart_section from "./_Components/Chart_section";
import TopTrends from "./_Components/TopTrends";

export default function Home() {
  return (
    <React.Fragment>
      <Header/>
      <GlobalMarketTable/>
      <TopCoins/>
      <Chart_section/>
      <TopTrends/>
    </React.Fragment>
  );
}
