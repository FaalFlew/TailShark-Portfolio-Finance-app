import { SyntheticEvent } from "react";
import { CompanySearch } from "../../Types/company";
import Card from "../Card/Card"
import {v4 as uuidv4} from "uuid"

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props>= ({searchResults,onPortfolioCreate}: Props): JSX.Element => {
  return (
  <div>
    {searchResults.length> 0 ? (
      searchResults.map((result) => {
        return <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate}/>;
    })
    ): (

      <p>no results</p>
    )}
  </div>)
}

export default CardList