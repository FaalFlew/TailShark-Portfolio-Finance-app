import React, { useState, useEffect } from "react";
import "./StockTicker.css";

interface StockInfo {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockStockData: StockInfo[] = [
  { symbol: "AAPL", price: 175.25, change: 1.15, changePercent: 0.66 },
  { symbol: "GOOGL", price: 2800.5, change: -15.75, changePercent: -0.56 },
  { symbol: "MSFT", price: 305.8, change: 2.4, changePercent: 0.79 },
  { symbol: "AMZN", price: 3400.0, change: -5.5, changePercent: -0.16 },
  { symbol: "TSLA", price: 1100.9, change: 25.3, changePercent: 2.35 },
  { symbol: "NVDA", price: 290.1, change: 7.8, changePercent: 2.76 },
  { symbol: "META", price: 330.65, change: -1.05, changePercent: -0.32 },
  { symbol: "JPM", price: 160.4, change: 0.95, changePercent: 0.6 },
  { symbol: "V", price: 220.15, change: -0.55, changePercent: -0.25 },
  { symbol: "DIS", price: 150.8, change: 1.2, changePercent: 0.8 },
  { symbol: "NFLX", price: 500.0, change: -8.2, changePercent: -1.61 },
  { symbol: "PYPL", price: 180.5, change: 2.1, changePercent: 1.18 },
  { symbol: "BABA", price: 115.75, change: -0.9, changePercent: -0.77 },
  { symbol: "CRM", price: 245.9, change: 3.5, changePercent: 1.44 },
  { symbol: "INTC", price: 52.3, change: 0.15, changePercent: 0.29 },
];

const StockTicker: React.FC = () => {
  const [stocks, setStocks] = useState<StockInfo[]>(mockStockData);

  const getChangeColor = (change: number): string => {
    if (change > 0) return "ticker-change-positive";
    if (change < 0) return "ticker-change-negative";
    return "ticker-change-neutral";
  };

  const formatChange = (change: number): string => {
    return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  };

  const formatChangePercent = (changePercent: number): string => {
    const sign = changePercent > 0 ? "+" : "";
    return `${sign}${changePercent.toFixed(2)}%`;
  };

  return (
    <div className="ticker-wrap">
      <div className="ticker-move">
        {stocks.map((stock, index) => (
          <div className="ticker-item" key={`${stock.symbol}-${index}-1`}>
            <span className="ticker-symbol">{stock.symbol}</span>
            <span className="ticker-price">${stock.price.toFixed(2)}</span>
            <span className={`ticker-change ${getChangeColor(stock.change)}`}>
              {formatChange(stock.change)} (
              {formatChangePercent(stock.changePercent)})
            </span>
          </div>
        ))}

        {stocks.map((stock, index) => (
          <div
            className="ticker-item"
            key={`${stock.symbol}-${index}-2`}
            aria-hidden="true"
          >
            <span className="ticker-symbol">{stock.symbol}</span>
            <span className="ticker-price">${stock.price.toFixed(2)}</span>
            <span className={`ticker-change ${getChangeColor(stock.change)}`}>
              {formatChange(stock.change)} (
              {formatChangePercent(stock.changePercent)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
