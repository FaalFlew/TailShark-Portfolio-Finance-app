import "../../Shared/Css/Global.css";
import React from "react";
import Hero from "../../Components/Hero/Hero";
import StockTicker from "../../Components/StockTicker/StockTicker";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <main className="main">
        <StockTicker />
        <Hero />
      </main>
    </div>
  );
};

export default HomePage;
