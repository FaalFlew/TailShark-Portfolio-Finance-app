import { SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from 'react-router-dom';


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
    <Link to={`/company/${searchResult.symbol}`} className="">
      {searchResult.name} ({searchResult.symbol})
    </Link>
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