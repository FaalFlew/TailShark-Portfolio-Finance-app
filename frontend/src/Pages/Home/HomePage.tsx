import "../../Shared/Css/Global.css";
import React from "react";
import Hero from "../../Components/Hero/Hero";
import TickerTape from "../../Components/TickerTape/TickerTape";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <main className="main">
        <TickerTape />
        <Hero />
      </main>
    </div>
  );
};

export default HomePage;
