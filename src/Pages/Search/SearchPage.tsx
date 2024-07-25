import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { searchCompanies } from '../../Api/api';
import { CompanySearch } from '../../Types/company';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';
import { handleApiResponse } from '../../Utils/apiResponseHandler';

interface Props {}

const SearchPage = (props: Props) => {
  
  const [search,setSearch] = useState<string>('');
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
  {
      setSearch(e.target.value);
      console.log(e);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => 
  {
      e.preventDefault();
      const response = await searchCompanies(search);
      const result = handleApiResponse(response)
      if (result.error) {
        setServerError(result.error);
      } else if (result.data) {
        setSearchResult(result.data);
      }
  };
  
  const onPortfolioCreate = (e: any) =>
  {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value)
    if (exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e:any) => {
    e.preventDefault();
    const removed = portfolioValues.filter( (value) => {
       console.log("val"+value);
       console.log("target"+e.target[0].value);

      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }
  return (
    <>
    <main>
    <Search 
      onSearchSubmit={onSearchSubmit} 
      search={search} 
      handleSearchChange={handleSearchChange}
    />
    <ListPortfolio 
      portfolioValues={portfolioValues} 
      onPortfolioDelete={onPortfolioDelete}
     />
    <CardList 
      searchResults={searchResult} 
      onPortfolioCreate={onPortfolioCreate}
     />
    {serverError && <h1>{serverError}</h1>}
    </main>
  </>  )
}

export default SearchPage