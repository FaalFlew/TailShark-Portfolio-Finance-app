import { SyntheticEvent } from "react";
import { CompanySearch } from "../../comapny";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";


interface Props  {
  id: string;
  searchResult:CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({id,searchResult, onPortfolioCreate}: Props): JSX.Element => {
  return (
    <div
    className=""
    key={id}
    id={id}
  >
    <h2 className="">
      {searchResult.name} ({searchResult.symbol})
    </h2>
    <p className="">{searchResult.currency}</p>
    <p className="">
      {searchResult.exchangeShortName} - {searchResult.stockExchange}
    </p>
    <AddPortfolio
      onPortfolioCreate={onPortfolioCreate}
      symbol={searchResult.symbol}
    />
  </div>
  )
}

export default Card