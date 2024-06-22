import { CompanySearch } from "../comapny";
import Card from "./Card"
import {v4 as uuidv4} from "uuid"

interface Props {
  searchResults: CompanySearch[];
}

const CardList: React.FC<Props>= ({searchResults}: Props): JSX.Element => {
  return (<>
    {searchResults.length> 0 ? (
      searchResults.map((result) => {
        return <Card id={result.symbol} key={uuidv4()} searchResult={result}/>;
    })
    ): (

      <h1>no results</h1>
    )}
  </>)
}

export default CardList