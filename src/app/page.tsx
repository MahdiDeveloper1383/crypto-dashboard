import React from "react";
import Header from "./_Components/Header";
import GlobalMarketTable from "./_Components/overviewtable";

export default function Home() {
  return (
    <React.Fragment>
      <Header/>
      <GlobalMarketTable/>
    </React.Fragment>
  );
}
