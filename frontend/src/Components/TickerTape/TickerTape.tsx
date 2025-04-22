import React, { useState, useEffect } from "react";
import "./TickerTape.css";
import { handleApiResponse } from "../../Utils/apiResponseHandler";
import "../../Shared/Css/Global.css";
import { CompanyQuote } from "../../Types/company";
import { getCompanyQuote } from "../../Api/companyDataApi";
import { CustomError } from "../../Helpers/AxiosErrorHandler";

const tickers: string =
  "AAPL,GOOGL,MSFT,AMZN,TSLA,NVDA,META,JPM,V,DIS,NFLX,PYPL,BABA,CRM,INTC";
const TickerTape: React.FC = () => {
  const [serverError, setServerError] = useState<CustomError>();
  const [stockQuote, setStockQuote] = useState<CompanyQuote[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTickerTape = async () => {
      setIsLoading(true);
      try {
        const response = await getCompanyQuote(tickers);
        const result = handleApiResponse(response);
        if (result instanceof CustomError) {
          setServerError(result);
          console.log(result);
        } else if (result.data) {
          setStockQuote(result.data);
        }
      } catch (error) {
        console.error("Error fetching ticker tape:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTickerTape();
  }, []);

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
        {stockQuote?.map((stock, index) => (
          <div className="ticker-item" key={`${stock.symbol}-${index}-1`}>
            <img
              src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png`}
              height="18px"
              width="18px"
              alt={stock.symbol}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            <span className="ticker-symbol">{stock.symbol}</span>
            <span className="ticker-price">${stock.price.toFixed(2)}</span>
            <span className={`ticker-change ${getChangeColor(stock.change)}`}>
              {formatChange(stock.change)} (
              {formatChangePercent(stock.changesPercentage)})
            </span>
          </div>
        ))}

        {stockQuote?.map((stock, index) => (
          <div
            className="ticker-item"
            key={`${stock.symbol}-${index}-2`}
            aria-hidden="true"
          >
            <img
              src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png`}
              height="18px"
              width="18px"
              alt={stock.symbol}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            <span className="ticker-symbol">{stock.symbol}</span>
            <span className="ticker-price">${stock.price.toFixed(2)}</span>
            <span className={`ticker-change ${getChangeColor(stock.change)}`}>
              {formatChange(stock.change)} (
              {formatChangePercent(stock.changesPercentage)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
